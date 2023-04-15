const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", { message });
  document.write(
    `<br><div style="text-align: left;margin-right: 2rem;margin-left: 60%;padding: 0.7rem; background-color:#90ee903d ;border: 1px solid green;"><b style="font-family:sans-serif;color:green;">YOU:</b> <b style="font-family:sans-serif; color:#00000099">${message.toUpperCase()}</b></div>`
  );
}
function setNickName(nickname) {
  socket.emit("setNickname", { nickname });
}

function handleMessage(data) {
  const { nickname, message } = data;

  document.write(
    `<br><div style="margin-left:1rem; margin-right:60%; background-color:#add8e64d; padding:0.7rem; border: 1px solid steelblue;"><b style="font-family:sans-serif;color:steelblue;">${nickname.toUpperCase()} :</b> <b style="font-family:sans-serif; color:#00000099">${message.toUpperCase()}</b></div>`
  );
}
socket.on("messageNotification", handleMessage);
