const db = require("../models");
const User = db.user;
const Chat = db.chat;

exports.newSocketConn = (io, user) => {
  io.on("connection", (socket) => {
    socket.emit("notify", true);
    socket.on("getNotification", (arg) => {
      user.set(arg.id, arg.sid);
      console.log(user);
    });
    socket.emit("checkOnline", Array.from(user.keys()));
    socket.on("sendMessage", (arg) => {
      console.log("send Message");
      Chat.create({
        ChatReci: arg.rid,
        ChatSend: arg.sid,
        ChatMes: arg.message,
      });
      const reciID = user.get(parseInt(arg.rid));
      console.log(reciID);
      io.sockets.sockets.get(reciID).emit("recieveMessage", {
        ChatReci: arg.rid,
        ChatSend: arg.sid,
        ChatMes: arg.message,
      });
    });
    socket.on("disconnect", () => {
      console.log("Disconnected : ", socket.id);
    });
  });
};
