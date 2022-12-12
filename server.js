const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");

const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.render("home");
  // res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  // res.render("room", { roomId: req.params.room });
  res.render("meeting", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("message", (message, userName) => {
      io.to(roomId).emit("createMessage", message, userName);
    });

    socket.on("editor", (code, roomId) => {
      socket.in(roomId).emit("createEditor", code, userName);
    });
  });
});

server.listen(process.env.PORT || 3000);
