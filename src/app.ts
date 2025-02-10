import express from 'express';
import userRoutes from './routes/user.routes';
import roomRoutes from './routes/room.routes';
import roomMessageRoutes from './routes/roomMessage.routes';
import blogRoutes from './routes/blog.routes';
import vocabRoutes from './routes/vocab.routes';
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/temp/'
}))

// app.use('/', )
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/room-message', roomMessageRoutes);
app.use('/blog', blogRoutes);
app.use('/vocab', vocabRoutes);



export default app;