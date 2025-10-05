import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

// Libera CORS para qualquer origem (GitHub Pages, ngrok, etc)
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));

// Cria o servidor HTTP
const server = http.createServer(app);

// Configura o Socket.io com CORS liberado
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Rota simples só pra testar se o servidor responde
app.get("/", (req, res) => {
  res.send("Servidor Socket.io está rodando ✅");
});

// Lida com conexões WebSocket
io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("chat message", (msg) => {
    console.log(`${msg.user}: ${msg.text}`);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
