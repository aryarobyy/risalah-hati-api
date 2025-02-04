import express from 'express';
import userRoutes from './routes/user.routes';
import roomRoutes from './routes/room.routes';
import roomMessageRoutes from './routes/roomMessage.routes';

const app = express();

app.use(express.json());

// app.use('/', )
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/room-message', roomMessageRoutes)



export default app;