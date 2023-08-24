// постройка сервера на основе протокола HTTP
const { Server } = require("socket.io");
const { createServer } = require("http");

// создание пустого сервера
const httpServer = createServer();

// создание веб-сокета, разрешено подкоючение с любых других портов
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// слушатель
io.on("connection", (socket) => {
  console.log('New frontend connect');
  // прием сообщений от socket.emit
  socket.on("chat-message", (message) => {
    socket.broadcast.emit("chat-message", message);
  });
});

httpServer.listen(4001);
