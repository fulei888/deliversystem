import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/rewardcard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
app.use('/api/users', userRouter);
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/frontend/build/index.html')))
app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

app.listen(5000, ()=> {
    console.log('server at http://localhost:5000');
})