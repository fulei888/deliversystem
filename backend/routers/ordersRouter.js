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
    const newOrder = await order.save();
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
ordersRouter.get("/getallorders", expressAsyncHandler(async(req, res)=> {
    const orders = await Orders.find();
    res.send(orders);
}))

ordersRouter.get("/tickets", isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    const allTickets = await personalOrders.find();
    console.log('allTickets',allTickets);
    res.send(allTickets);
}))



ordersRouter.put("/acceptorder/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const userId = req.params.id;
    const userTickets = await personalOrders.find({userId: userId});
    const selectedOrdrerId = req.body.orderId;
    if (userTickets) {
    userTickets[0].ordersItems.find(order=>order.orderId==selectedOrdrerId).status="ACCEPT";
    const updatedUserTickets = await userTickets[0].save();
    res.send(updatedUserTickets)
    }
    else {
        res.status(404).send({msg: "userTicket Not Found"});
    }
     //Make the order's show false so that the order will not show up in orders pool
     const updateOrder = await Orders.findOneAndUpdate({_id: selectedOrdrerId}, {show: false},{new: true})
     if (updateOrder) {
         console.log("update order not show ", updateOrder);
     }
}))

ordersRouter.put("/rejectorder/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const userId = req.params.id;
    const userTickets = await personalOrders.find({userId: userId});
    const selectedOrdrerId = req.body.orderId;
    if (userTickets) {
    userTickets[0].ordersItems.find(order=>order.orderId == selectedOrdrerId).status="REJECT";
    const updatedUserTickets = await userTickets[0].save();
    res.send(updatedUserTickets);
    }
    else {
        res.status(404).send({msg: "userTicket Not Found"});
    }
    //Make the order's show true so that the order will show up in orders pool
    const updateOrder = await Orders.findOneAndUpdate({_id: selectedOrdrerId}, {show: true},{new: true})
    if (updateOrder) {
        console.log("update order show", updateOrder);
    }
}))

ordersRouter.put("/releaseorder/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const userId = req.params.id;
    const userTickets = await personalOrders.find({userId: userId});
    const selectedOrdrerId = req.body.orderId;
    if (userTickets) {
    userTickets[0].ordersItems.find(order=>order.orderId == selectedOrdrerId).status="RELEASE";
    const updatedUserTickets = await userTickets[0].save();
    res.send(updatedUserTickets);
    }
    else {
        res.status(404).send({msg: "userTicket Not Found"});
    }
    
}))

ordersRouter.put("/deliversuccess/:id", isAuth, expressAsyncHandler(async(req,res)=>{
    const selectedOrdrerId = req.params.id;
    const userTickets = await personalOrders.find({userId: req.body.userInfo._id});
    if (userTickets) {
    userTickets[0].ordersItems.find(order=>order.orderId == selectedOrdrerId).status="DELIVERED";
    const updatedUserTickets = await userTickets[0].save();
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

ordersRouter.get("/getstatus/:id", isAuth, isAdmin,expressAsyncHandler(async(req,res)=>{
    const userId = req.params.id.split('_')[0];
    const orderId = req.params.id.split('_')[1];
    const userTickets = await personalOrders.find({userId: userId});
  
    if (userTickets) {
    const ticketStatus = userTickets[0].ordersItems.find(order=>order.orderId==orderId).status;
    res.send(ticketStatus);
    }
    else {
        res.status(404).send({msg: "userTicket Not Found"});
    }
}))
ordersRouter.get("/yourtickets", isAuth, expressAsyncHandler(async(req, res)=>{
    const allYourTickets = await personalOrders.find({userId: req.user._id});
    res.send(allYourTickets);
}))

ordersRouter.delete("/removeyourrejectedtickets", isAuth, expressAsyncHandler(async(req, res)=>{
    const allYourTickets = await personalOrders.find({userId: req.user._id});
    const ordersItems = allYourTickets[0].ordersItems;
    const leftOrders = ordersItems.filter(order => order.status !== "REJECT")
    allYourTickets[0].ordersItems = leftOrders;
    const updatedTickets = await allYourTickets[0].save();
    if(updatedTickets) {
        res.send(leftOrders);
    }
}))

ordersRouter.get("/updateimagepath/:id", isAuth, expressAsyncHandler(async(req, res)=>{
    const allYourTickets = await personalOrders.find({userId: req.user._id});
    const orderId = req.params.id;

    const ordersItems = allYourTickets[0].ordersItems;
    const findImagePath = ordersItems.find(order => order.orderId == orderId).imagePath;
    console.log('findImagePath',findImagePath);
    res.send(findImagePath);
}))
ordersRouter.put("/updateimagepath/:id", isAuth, expressAsyncHandler(async(req, res)=>{
    const allYourTickets = await personalOrders.find({userId: req.user._id});
    const orderId = req.params.id;
    const ordersItems = allYourTickets[0].ordersItems;
   //const updatedOrders = ordersItems.map(order => order.orderId === orderId? order.imagPath=body.imagePath:order);
    const findOrderIndex = ordersItems.findIndex(element=>element.orderId == orderId)
    console.log('req.body.imagePath',req.body.imagePath);
    console.log('findOrderIndex',findOrderIndex);
    console.log('allYourTickets[0].ordersItems[findOrderIndex]',allYourTickets[0].ordersItems[findOrderIndex]);

    allYourTickets[0].ordersItems[findOrderIndex].imagePath = req.body.imagePath;
    const updatedTickets = await allYourTickets[0].save();
    if(updatedTickets) {
        console.log('updatedTickets.ordersItems[findOrderIndex].imagePath',updatedTickets.ordersItems[findOrderIndex].imagePath)
        res.send(updatedTickets.ordersItems[findOrderIndex].imagePath);
    }
}))


ordersRouter.post("/placeorders", isAuth, expressAsyncHandler(async(req,res)=>{
    //make selected orders disappear in the all orders list
    const cartItems = req.body.cartItems;
        if(cartItems&&cartItems.length>0){
            for(let element of cartItems) {
                const updateOrder = await Orders.findOneAndUpdate({_id: element.orderId}, {show: false},{new: true})
                if(updateOrder) {
                    console.log("newUpdate", updateOrder);
                }
            }
        }
    //if the user already had placeorders, we update it.
    //if the user does not have placeorders, we created it for him.
    const userTickets = await personalOrders.find({userId: req.user._id});
 
    if(userTickets&&userTickets.length!==0) {
        let arr = [...userTickets[0].ordersItems,...req.body.cartItems];
        const seen = new Set();
        const filteredArr = arr.filter(el => {
            const duplicate = seen.has(el.orderId.toString());
            seen.add(el.orderId.toString());
            return !duplicate;
          });
         
        userTickets[0].ordersItems= filteredArr;
        const personalTickets = await userTickets[0].save();
        if(personalTickets){
        res.send(personalTickets);
    }
}
    else {
            const personalOrder = new personalOrders({
                ordersItems:req.body.cartItems,
                userId: req.user._id,
            })
            const newPersonalOrder = await personalOrder.save();
            if (newPersonalOrder) {
                res.send({
                message:"New Personal Orders Created",
                data: newPersonalOrder
                })
            }
            else {
                res.status(401).send({msg: 'Invalid Personal Order Data'});
            }
    }
}))
ordersRouter.get("/:id", isAuth, expressAsyncHandler(async(req, res)=> {
    const order = await Orders.findOne({_id: req.params.id});
    if (order) {
        order.show = false;
        res.send(order);
    }
    else {
        res.status(404).send({message: 'Order Not Found'})
    }
}))
export default ordersRouter;