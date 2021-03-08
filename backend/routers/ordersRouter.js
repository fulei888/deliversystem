import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Orders from '../models/ordersModel.js';
import { getToken, isAuth,isAdmin } from '../util.js';
import personalOrders from '../models/personalOrdersModel.js';
const ordersRouter = express.Router();

ordersRouter.post('/creatingordersList', expressAsyncHandler(async (req, res)=>{
    const order = new Orders({
        state: req.body.state,
        city: req.body.city,
        street: req.body.street,
        ordernumber: req.body.ordernumber,
        product: req.body.product
    })
    const newOrder = await order.save().catch(e => { console.log(e) });
    if (newOrder) {
        res.send({
            _id: newOrder.id,
            state: newOrder.state,
            city: newOrder.city,
            street: newOrder.street,
            ordernumber: newOrder.ordernumber,
            product: newOrder.product
        })
    }
    else {
        res.status(401).send({msg: 'Invalid Order Data'});
    }
}))
let prevCreatedDate = '';
ordersRouter.get("/getallorders", expressAsyncHandler(async(req, res)=> {
   console.log('req.query', req.query);
    const stateSearch = req.query.stateSearch 
    ? {
        state: {
            $regex: req.query.stateSearch,
            $options: 'i'
        }
    }
    :{};
    const citySearch = req.query.citySearch 
    ? {
        city: {
            $regex: req.query.citySearch,
            $options: 'i'
        }
    }
    :{};
    const streetSearch = req.query.streetSearch 
    ? {
        street: {
            $regex: req.query.streetSearch,
            $options: 'i'
        }
    }
    :{};
    const orderNumberSearch = req.query.orderNumberSearch 
    ? {
        ordernumber: {
            $regex: req.query.orderNumberSearch,
            $options: 'i'
        }
    }
    :{};
    const createdDateSearch = req.query.createdDateSearch 
    ? {
        updatedAt: {
            $gte: req.query.createdDateSearch 
        }
    }
    :{};
    
    const stateSort = (req.query.stateSortClicked=='true') 
    ?(req.query.stateSortAscending =='true')
    ?{state: 1}
    :{state:-1}
    :{};

    const streetSort = (req.query.streetSortClicked=='true') 
    ?req.query.streetSortAscending == 'true'
    ?{street: 1}
    :{street:-1}
    :{};
    const citySort = (req.query.citySortClicked == 'true') 
    ?req.query.citySortAscending == 'true'
    ?{city: 1}
    :{city:-1}
    :{};
    const orderNumberSort = (req.query.orderNumberSortClicked == 'true') 
    ?req.query.orderNumberSortAscending == 'true'
    ?{ordernumber: 1}
    :{ordernumber:-1}
    :{};
    const createdDateSort = (req.query.createdDateSortClicked == 'true') 
    ?req.query.createdDateSortAscending == 'true'
    ?{updatedAt: 1}
    :{updatedAt:-1}
    :{};
   console.log('req.query',req.query);
   console.log("all sort ", {...stateSort, ...citySort, ...streetSort, ...orderNumberSort, ...createdDateSort})
  
  const orders = await Orders.find({ ...stateSearch, ...citySearch, ...streetSearch, ...orderNumberSearch, ...createdDateSearch})
    .sort({...stateSort, ...citySort, ...streetSort, ...orderNumberSort, ...createdDateSort})
    .catch(e => { console.log(e) });
    //console.log('orders check', orders);
    res.send(orders);
}))

ordersRouter.get("/tickets", isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    const allTickets = await personalOrders.find().catch(e => { console.log(e) });
    console.log('allTickets',allTickets);
    res.send(allTickets);
}))



ordersRouter.put("/acceptorder/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const userId = req.params.id;
    const userTickets = await personalOrders.find({userId: userId}).catch(e => { console.log(e) });
    const selectedOrdrerId = req.body.orderId;
    if (userTickets) {
    userTickets[0].ordersItems.find(order=>order.orderId==selectedOrdrerId).status="ACCEPT";
    const updatedUserTickets = await userTickets[0].save().catch(e => { console.log(e) });
    res.send(updatedUserTickets)
    }
    else {
        res.status(404).send({msg: "userTicket Not Found"});
    }
     //Make the order's show false so that the order will not show up in orders pool
     const updateOrder = await Orders.findOneAndUpdate({_id: selectedOrdrerId}, {show: false},{new: true}).catch(e => { console.log(e) })
     if (updateOrder) {
         console.log("update order not show ", updateOrder);
     }
}))

ordersRouter.put("/deleteorder/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const userId = req.params.id;
    const userTickets = await personalOrders.find().catch(e => { console.log(e) });
    const selectedOrdrerId = req.body.orderId;
    console.log('selectedOrdrerId',selectedOrdrerId);
    //Delete the order from the orders pool
    const deleteOrder = await Orders.findById(selectedOrdrerId).catch(e => { console.log(e) });
    if(deleteOrder) {
        deleteOrder.remove();
    }
    let index = 0;
    //Delete the order from every person's tickets
    for(let userTicket of userTickets) {
        let newOrderItems = userTicket.ordersItems.filter(order=>String(order.orderId)!==selectedOrdrerId);
        if (userTicket.ordersItems.length > newOrderItems.length) {
          userTickets[index].ordersItems = newOrderItems;
          let newticket = await  userTickets[index].save().catch(e => { console.log(e) });
          if(newticket) {
              console.log("new tickets saved", newticket);
          }
        }
        index++;
    }
    const newUserTickets = await personalOrders.find().catch(e => { console.log(e) });
    if(newUserTickets) {
        res.send(newUserTickets);
    }

    // if (userTickets) {
    // const tempArr = userTickets[0].ordersItems.filter(order=>String(order.orderId)!==selectedOrdrerId);
    // //console.log("tempArr",tempArr);
   
    // userTickets[0].ordersItems = tempArr;
    // //console.log("userTickets[0].ordersItems ",userTickets[0].ordersItems );
    
    
    // const yourTicketsAferRemoved = await userTickets[0].save();
    //     if(yourTicketsAferRemoved) {
    //         res.send(yourTicketsAferRemoved)
    //     }
    // }
    // else {
    //     res.status(404).send({msg: "userTicket Not Found"});
    // }
     
     
}))

ordersRouter.put("/rejectorder/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const userId = req.params.id;
    const userTickets = await personalOrders.find({userId: userId}).catch(e => { console.log(e) });
    const selectedOrdrerId = req.body.orderId;
    if (userTickets) {
    userTickets[0].ordersItems.find(order=>order.orderId == selectedOrdrerId).status="REJECT";
    const updatedUserTickets = await userTickets[0].save().catch(e => { console.log(e) });
    res.send(updatedUserTickets);
    }
    else {
        res.status(404).send({msg: "userTicket Not Found"});
    }
    //Make the order's show true so that the order will show up in orders pool
    const updateOrder = await Orders.findOneAndUpdate({_id: selectedOrdrerId}, {show: true},{new: true}).catch(e => { console.log(e) })
    if (updateOrder) {
        console.log("update order show", updateOrder);
    }
}))

ordersRouter.put("/releaseorder/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const userId = req.params.id;
    const userTickets = await personalOrders.find({userId: userId}).catch(e => { console.log(e) });
    const selectedOrdrerId = req.body.orderId;
    if (userTickets) {
    userTickets[0].ordersItems.find(order=>order.orderId == selectedOrdrerId).status="RELEASE";
    const updatedUserTickets = await userTickets[0].save().catch(e => { console.log(e) });
    res.send(updatedUserTickets);
    }
    else {
        res.status(404).send({msg: "userTicket Not Found"});
    }
    
}))

ordersRouter.put("/deliversuccess/:id", isAuth, expressAsyncHandler(async(req,res)=>{
    const selectedOrdrerId = req.params.id;
    const userTickets = await personalOrders.find({userId: req.body.userInfo._id}).catch(e => { console.log(e) });
    if (userTickets) {
    userTickets[0].ordersItems.find(order=>order.orderId == selectedOrdrerId).status="DELIVERED";
    const updatedUserTickets = await userTickets[0].save().catch(e => { console.log(e) });
        if(updatedUserTickets) {
            res.send(updatedUserTickets.ordersItems);
        }
        else {
            res.status(404).send({msg: "userTicket Can not be Saved"});
        }
    }
    else {
        res.status(404).send({msg: "userTicket Not Found"});
    }
    
}))

ordersRouter.get("/getstatus/:id", isAuth,expressAsyncHandler(async(req,res)=>{
    const userId = req.params.id.split('_')[0];
    const orderId = req.params.id.split('_')[1];
    const userTickets = await personalOrders.find({userId: userId}).catch(e => { console.log(e) });
  
    if (userTickets) {
    const ticketStatus = userTickets[0].ordersItems.find(order=>order.orderId==orderId).status;
    res.send(ticketStatus);
    }
    else {
        res.status(404).send({msg: "userTicket Not Found"});
    }
}))
ordersRouter.get("/yourtickets", isAuth, expressAsyncHandler(async(req, res)=>{
    const allYourTickets = await personalOrders.find({userId: req.user._id}).catch(e => { console.log(e) });
    res.send(allYourTickets);
}))

ordersRouter.delete("/removeyourrejectedtickets", isAuth, expressAsyncHandler(async(req, res)=>{
    const allYourTickets = await personalOrders.find({userId: req.user._id}).catch(e => { console.log(e) });
    const ordersItems = allYourTickets[0].ordersItems;
    const leftOrders = ordersItems.filter(order => order.status !== "REJECT")
    allYourTickets[0].ordersItems = leftOrders;
    const updatedTickets = await allYourTickets[0].save().catch(e => { console.log(e) });
    if(updatedTickets) {
        res.send(leftOrders);
    }
}))

ordersRouter.get("/updateimagepath/:id", isAuth, expressAsyncHandler(async(req, res)=>{
    const allYourTickets = await personalOrders.find({userId: req.user._id}).catch(e => { console.log(e) });
    const orderId = req.params.id;

    const ordersItems = allYourTickets[0].ordersItems;
    const findImagePath = ordersItems.find(order => order.orderId == orderId).imagePath;
    console.log('findImagePath',findImagePath);
    res.send(findImagePath);
}))
ordersRouter.put("/updateimagepath/:id", isAuth, expressAsyncHandler(async(req, res)=>{
    const allYourTickets = await personalOrders.find({userId: req.user._id}).catch(e => { console.log(e) });
    const orderId = req.params.id;
    const ordersItems = allYourTickets[0].ordersItems;
   //const updatedOrders = ordersItems.map(order => order.orderId === orderId? order.imagPath=body.imagePath:order);
    const findOrderIndex = ordersItems.findIndex(element=>element.orderId == orderId)
    console.log('req.body.imagePath',req.body.imagePath);
    console.log('findOrderIndex',findOrderIndex);
    console.log('allYourTickets[0].ordersItems[findOrderIndex]',allYourTickets[0].ordersItems[findOrderIndex]);

    allYourTickets[0].ordersItems[findOrderIndex].imagePath = req.body.imagePath;
    const updatedTickets = await allYourTickets[0].save().catch(e => { console.log(e) });
    if(updatedTickets) {
        console.log('updatedTickets.ordersItems[findOrderIndex].imagePath',updatedTickets.ordersItems[findOrderIndex].imagePath)
        res.send(updatedTickets.ordersItems[findOrderIndex].imagePath);
    }
}))


ordersRouter.post("/placeorders", isAuth, expressAsyncHandler(async(req,res)=>{
    //make selected orders disappear in the all orders list
    let cartItems = req.body.cartItems;
    let arr =[];
    let repeatedOrdersArr=[];
  
        if(cartItems&&cartItems.length>0){
            for(let element of cartItems) {
                //const updateOrder = await Orders.findOneAndUpdate({_id: element.orderId}, {show: false},{new: true})
                const findOrder = await Orders.findOne({_id: element.orderId}).catch(e => { console.log(e) });
                console.log('findOrder', findOrder)
                if(findOrder.show===false){
                    repeatedOrdersArr.push(element);
                }
                else{
                    console.log('findOrder ddd', findOrder)
                arr.push(element);
                console.log('element', arr)
                const updateOrder = await Orders.findOneAndUpdate({_id: element.orderId}, {show: false},{new: true}).catch(e => { console.log(e) })
                if(updateOrder) {
                    console.log("newUpdate", updateOrder);
                }    
            }
                
            }
        }
        cartItems = [...arr];
        if(cartItems.length==0) {
            res.send({
                repeated:true,
                message: "Your order was taken by others",
                data:[{reaptedOrderId: repeatedOrdersArr}]})
        }
    //if the user already had placeorders, we update it.
    //if the user does not have placeorders, we created it for him.
    const userTickets = await personalOrders.find({userId: req.user._id}).catch(e => { console.log(e) });
 
    if(userTickets&&userTickets.length!==0) {
        let arr = [...userTickets[0].ordersItems,...cartItems];
        const seen = new Set();
        const filteredArr = arr.filter(el => {
            const duplicate = seen.has(el.orderId.toString());
            seen.add(el.orderId.toString());
            return !duplicate;
          });
         
        userTickets[0].ordersItems= filteredArr;
        const personalTickets = await userTickets[0].save().catch(e => { console.log(e) });
        console.log('personalTickets',personalTickets);
        if(personalTickets&&repeatedOrdersArr.length>0){
        res.send([{reaptedOrderId: repeatedOrdersArr},...personalTickets.ordersItems]);
        }
        else if(personalTickets&&repeatedOrdersArr.length===0) {
            res.send(personalTickets.ordersItems);
        }
}
    else {
            const personalOrder = new personalOrders({
                ordersItems:cartItems,
                userId: req.user._id,
            })
            const newPersonalOrder = await personalOrder.save().catch(e => { console.log(e) });
            if (newPersonalOrder) {
                res.send({
                message:"New Personal Orders Created",
                data: [{reaptedOrderId: repeatedOrdersArr},...newPersonalOrder.ordersItems]
                })
            }
            else {
                res.status(401).send({msg: 'Invalid Personal Order Data'});
            }
    }
}))
ordersRouter.get("/:id", isAuth, expressAsyncHandler(async(req, res)=> {
    const order = await Orders.findOne({_id: req.params.id}).catch(e => { console.log(e) });
    if (order) {
        order.show = false;
        res.send(order);
    }
    else {
        res.status(404).send({message: 'Order Not Found'})
    }
}))
export default ordersRouter;