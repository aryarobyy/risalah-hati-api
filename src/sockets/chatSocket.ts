import { Server, Socket } from "socket.io";
import { getRoomMessageByRoomId, postMessage } from "../services/message.service";

const chatSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);
    
        socket.on("joinRoom", async (roomId: string) => {
            socket.join(roomId);
    
            // send room message into client
            const messages = await getRoomMessageByRoomId(roomId);
            socket.emit("loadMessages", messages);
        });
    
        socket.on("sendMessage", async (data) => {
            const newMessage = await postMessage(data);
            // io.emit("sendMessage", data);
            io.to(data.roomId).emit("newMessage", newMessage);
        });
    
    
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

export default chatSocket;