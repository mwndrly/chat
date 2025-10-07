# 💬 Chat Distribuído com Node.js e Socket.IO

Um projeto de **chat em tempo real** desenvolvido com **Node.js**, **Express** e **Socket.IO**, com suporte a **CORS** e arquitetura distribuída.  
Permite a comunicação instantânea entre múltiplos clientes conectados via WebSocket.

---

## 🚀 Funcionalidades

- Comunicação em **tempo real** entre usuários  
- Conexões simultâneas via **WebSockets**  
- Tratamento global de **CORS**  
- Emissão e recebimento de mensagens para todos os clientes conectados  
- Log de eventos de conexão e desconexão  
- Arquitetura pronta para distribuição horizontal  

---

## 🧩 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [HTTP Server (nativo do Node)](https://nodejs.org/api/http.html)
- [CORS Middleware](https://www.npmjs.com/package/cors)

---

## 🏗️ Arquitetura da Solução

A aplicação segue uma arquitetura cliente-servidor distribuída, com um servidor central responsável por gerenciar conexões WebSocket e retransmitir mensagens entre os clientes conectados.

### 🔹 Figura 1 – Arquitetura da Solução

```
[ CLIENTE A ]  ⇄
                \
                 → [ SERVIDOR NODE.JS + SOCKET.IO ] → [ CLIENTE B ]
                /
[ CLIENTE C ]  ⇄
```

O servidor Express gerencia as rotas HTTP, enquanto o Socket.IO gerencia os eventos de conexão e troca de mensagens.

---

## 🔄 Fluxo de Comunicação

### 🔹 Figura 2 – Fluxo de Comunicação

```
Cliente → (envia mensagem) → Servidor
Servidor → (transmite para todos os clientes conectados) → Todos os Clientes
```

1. O cliente envia uma mensagem via evento `"chat message"`.  
2. O servidor recebe e emite o mesmo evento para todos os clientes conectados (`io.emit()`).  
3. Todos os usuários visualizam a nova mensagem em tempo real.

---

## ⚙️ Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/chat-distribuido.git
cd chat-distribuido
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o servidor

```bash
node server.js
```

O servidor será iniciado em:

👉 **http://localhost:3000**

---

## 💻 Exemplo de Código (Servidor)

```javascript
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*", methods: ["GET", "POST", "OPTIONS"] }));

app.get("/", (req, res) => res.send("Servidor Socket.io está rodando ✅"));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

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

server.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
```

---

## 🧠 Testes e Resultados

- Testado com múltiplos clientes simultâneos via navegador  
- Comunicação instantânea validada via console.log e interface cliente  
- Logs de conexão/desconexão confirmando estabilidade da transmissão  

---

## 📘 Licença

Este projeto é distribuído sob a licença **MIT**.  
Sinta-se à vontade para usar, modificar e distribuir.

---

## 👩‍💻 Autor

**Seu Nome Aqui**  
📧 Email: seuemail@exemplo.com  
🌐 GitHub: [@seuusuario](https://github.com/seuusuario)
