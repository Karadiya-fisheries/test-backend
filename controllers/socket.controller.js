const { user, lot, bidder, owner } = require("../models");
const db = require("../models");
const User = db.user;
const Chat = db.chat;
const Lot = db.lot;

exports.newSocketConn = (io, user) => {
  io.on("connection", (socket) => {
    socket.emit("notify", true);
    socket.on("getNotification", (arg) => {
      user.set(arg.id, arg.sid);
      socket.broadcast.emit("joinedUser", arg.id);
      console.log(user);
    });
    socket.emit("checkOnline", Array.from(user.keys()));
    socket.on("sendMessage", (arg) => {
      try {
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
      } catch (err) {
        console.log(err);
      }
    });
    socket.on("MakeABid", async (arg) => {
      try {
        console.log("Making a Bid");
        const lotId = arg.lotId;
        const bidderUid = arg.bidderUid;
        const BidPrice = arg.bidPrice;
        const ownerId = arg.ownerId;

        const lot1 = await lot.findOne({ where: { LotId: lotId } });
        const bidder1 = await bidder.findOne({ where: { userUid: bidderUid } });
        lot1
          .addBidder(bidder1, { through: { BidPrice: BidPrice } })
          .then((bid) => {
            lot1.CurrentBid = BidPrice;
            lot1.save().then((updateBidder) => {
              console.log(updateBidder);
            });
          })
          .catch((err) => {
            console.log(err);
          });

        lot
          .findOne({
            where: { LotId: lotId },
            include: [
              {
                model: bidder,
                where: {
                  BidderId: bidder1.BidderId,
                },
                include: [
                  {
                    model: db.user,
                    attributes: [
                      "uid",
                      "phone",
                      "email",
                      "fullname",
                      "profileUrl",
                    ],
                  },
                ],
              },
            ],
          })
          .then((lotone) => {
            console.log(lotone.bidders);
            const reciID = user.get(parseInt(ownerId));
            console.log(reciID);
            io.emit("RecieveABid", {
              bid: lotone.bidders[0],
              CurrentPrice: BidPrice,
            });
            //   io.sockets.sockets
            //     .get(reciID)
            //     .emit("RecieveABid", lotone.bidders[0]);
          });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected : ", socket.id);
    });
  });
};
