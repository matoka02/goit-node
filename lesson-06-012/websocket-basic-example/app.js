const ws = new require("ws");

// создание веб-сокет сервера
const wsServer = new ws.Server({ port: 5000 });

// запись всех подключенных сокетов
const socketList = [];

// слушатель подключений
wsServer.on("connection", (socket) => {
  // console.log("New frontend connected");
  socketList.push(socket);
  // console.log(socketList);
  // сообщение только для нового подключения
  setTimeout(() => {
    socket.send("Welcome to web-socket server");
  }, 4000);
  // сообщение для остальных подключений
  socketList.forEach((item) => {
    if (item !== socket) {
      item.send("New member connect");
    }
  });
});
