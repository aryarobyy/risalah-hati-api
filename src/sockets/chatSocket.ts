import { Server, Socket } from "socket.io";
import { getRoomMessageByRoomId, postMessage } from "../services/message.service";

const chatSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        socket.on("joinRoom", async (roomId: string) => {
            socket.join(roomId);
    
            const messages = await getRoomMessageByRoomId(roomId);
            socket.emit("loadMessages", messages);
        });
    
        socket.on("sendMessage", async (data) => {
            const newMessage = await postMessage(data);
            // io.emit("sendMessage", data);
            io.to(data.roomId).emit("newMessage", data);
        });
    
    
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

export default chatSocket;