import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  socketConnect,
  newComment,
  checkNotification,
} from "../reducers/notificationSlice";

export default function SocketContainer() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const socketId = useSelector((state) => state.notification.socketId);
  const notif = useSelector((state) => state.notification.notifications);
  let socketRef = useRef(null);

  console.log(notif);

  const addNotif = (postId, title) => {
    const newNotif = { postId: postId, title: title, isChecked: false };

    dispatch(newComment(newNotif));
    dispatch(checkNotification(false));
  };

  useEffect(() => {
    let socket;
    console.log(socketId);
    if (isLogin) {
      socketRef.current = io(process.env.REACT_APP_API_URI, {
        transports: ["websocket"],
      });
      socket = socketRef.current;

      socket.on("error", (error) => {
        console.log(error);
      });

      socket.on("connect", () => {
        console.log(socket);
        dispatch(socketConnect(socket.id));
        const userId = "62eb19eec68ed76ba371a228";
        socket.emit("userId", userId);
      });

      socket.on("newComment", (postId, title) => {
        addNotif(postId, title);
      });

      socket.on("disconnect", () => {
        dispatch(socketConnect(null));
      });
    }

    return () => {
      if (socket) socket.disconnect();
      dispatch(socketConnect(null));
    };
  }, [isLogin]);
}
