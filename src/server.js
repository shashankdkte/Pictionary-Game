import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";
//Setting the port for local developement
const PORT = 4000;
const app = express();

//Setting pug as templating engine
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO(server);

// io.on("connection", () => console.log("Somebody conected"));
let sockets = [];
io.on("connection", (socket) => {
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotification", {
      nickname: socket.nickname || "ANONYMOUS",
      message,
    });
  });

  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
