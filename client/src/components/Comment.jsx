import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  WriterInfo,
  Writer,
  ProsAndCons,
  ModifyAndDelete,
  Contents,
} from "./CommentStyled";

export default function Comment({ comment }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const accessToken = useSelector((state) => state.login.accessToken);
  const [modifiedComment, setModifiedComment] = useState("");
  const data = {
    commentContent: modifiedComment,
  };
  const config = {
    headers: {
      "access-token": accessToken,
    },
  };
  //  댓글 수정버튼 눌렀을 때 함수
  const handleModifyComment = () => {};
  // 댓글 삭제버튼 눌렀을 때 함수
  const handleRemoveComment = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/comments/${comment._id}`)
      // .then((result) => )
      .catch((error) => console.log(error));
  };
  // console.log(comment);
  return (
    <Container>
      <WriterInfo>
        <Writer>
          <ProsAndCons background={"red"}></ProsAndCons>
          <div>{comment.username}</div>
        </Writer>
        {/* {comment.userId === userInfo.id ? ( */}
        <ModifyAndDelete>
          <span onClick={handleModifyComment}>수정</span>
          <span> | </span>
          <span onClick={handleRemoveComment}>삭제</span>
        </ModifyAndDelete>
        {/* ) : null} */}
      </WriterInfo>
      <Contents>
        <div>{comment.contents}</div>
        <div>
          <img src={"/images/thumbUp.png"} alt={"like-mark"}></img>
          <div>{comment.likes}</div>
        </div>
      </Contents>
    </Container>
  );
}
