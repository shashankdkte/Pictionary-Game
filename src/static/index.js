const socket = io("/");
socket.on("hello", () => {
  document.write("New User Joined");
});

setTimeout(() => socket.emit("client"), 4000);
