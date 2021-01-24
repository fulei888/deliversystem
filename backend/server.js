import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import ordersRouter from './routers/ordersRouter.js';
import uploadRouter from './routers/uploadRouter.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/delivery-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use('/api/uploads', uploadRouter);
app.use('/api/user', userRouter);
app.use('/api/orders', ordersRouter);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get('/', (req, res) => {   
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});