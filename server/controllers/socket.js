import Comment from "../models/comment.js";

export const socketServer = (socket, io) => {
  socket.on("userId", (userId) => {
    socket.data.userId = userId;
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("소켓 해제");
  });

  let changeStream;
  try {
    changeStream = Comment.watch();

    changeStream.on("change", (next) => {
      switch (next.operationType) {
        case "insert":
          console.log(next.fullDocument.userId.toString());
          const userIdToNotify = next.fullDocument.userId.toString();
          socket
            .to(userIdToNotify)
            .emit("newComment", next.fullDocument._id, next.fullDocument.title);
          break;
      }
    });
  } catch (err) {}
};
