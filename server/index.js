import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server, {
  cors: { origin: "*" } // permite conexões de qualquer origem
});

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("chat message", (msg) => {
    // msg = { user, text }
    console.log(`${msg.user}: ${msg.text}`);
    io.emit("chat message", msg); // reenvia para todos os clientes
  });

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
