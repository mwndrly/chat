import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

// CORS global (pré‐flight OPTIONS incluso)
app.use(cors({ origin: "*", methods: ["GET", "POST", "OPTIONS"] }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (req, res) => res.send("Servidor Socket.io está rodando ✅"));

const server = http.createServer(app);

const io = new Server(server, {
  // CORS também no Engine.IO (socket transport)
  cors: { origin: "*", methods: ["GET", "POST"] },
  // path padrão; deixe explícito pra evitar confusão
  path: "/socket.io/"
});

// Logs de erro de handShake/transporte
io.engine.on("connection_error", (err) => {
  console.log("EIO connection_error:", {
    code: err.code,
    message: err.message,
    context: err.context
  });
});

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("chat message", (msg) => {
    console.log(`${msg?.user}: ${msg?.text}`);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Cliente desconectado: ${socket.id} (${reason})`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
