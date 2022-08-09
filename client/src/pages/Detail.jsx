import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Comment from "../components/Comment";
import { Body, ButtonField } from "./WriteStyled";
import {
  Title,
  Info,
  ResultFiled,
  ContentsFiled,
  Contents,
  AttachedField,
  AttachedFile,
  InputField,
  SortBy,
  Sort,
  CommentsField,
} from "./DetailStyled";

export default function Detail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const accessToken = useSelector((state) => state.login.accessToken);
  const [postInfo, setPostInfo] = useState(null);
  const [comment, setComment] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [commentList, setCommentList] = useState([]);
  const [update, isUpdate] = useState(false);
  const [endUpdate, isEndUpdate] = useState(false);
  const [page, setPage] = useState(1);

  // 삭제하기 버튼 클릭 함수
  const handleRemoveButton = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/posts/62f246602d115f4e6e41903b`)
      .then((result) => {
        Swal.fire({
          title: "법안을 삭제하시겠습니까?",
          text: "삭제한 법안은 복구되지 않습니다.",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      });
  };

  // 날짜계산 함수
  const AfterOneMonth = (date) => {
    const plusOneMonth = new Date(
      new Date(date).getTime() + 1000 * 60 * 60 * 24 * 30
    );
    const dateFormat =
      plusOneMonth.getFullYear() +
      "-" +
      (plusOneMonth.getMonth() + 1 < 9
        ? "0" + (plusOneMonth.getMonth() + 1)
        : plusOneMonth.getMonth() + 1) +
      "-" +
      (plusOneMonth.getDate() + 1 < 9
        ? "0" + plusOneMonth.getDate()
        : plusOneMonth.getDate());
    return `${date.slice(0, 10)} ~ ${dateFormat}`;
  };

  // 첨부파일 다운로드받는 함수
  const handleDownloadFile = (idx) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/posts/download/62f246602d115f4e6e41903b?fileIndex=${idx}`
      )
      .then((result) => {
        const url = result.config.url;
        const a = document.createElement("a");
        a.href = url;
        a.click();
        setTimeout((_) => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch((error) => console.log(error));
  };

  // 댓글작성 버튼 눌렀을 때 함수
  const handleCreateComment = () => {
    if (comment.length) {
      setComment("");
      const data = {
        commentContent: comment,
      };
      const config = {
        headers: {
          "access-token": accessToken,
        },
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/comments/62f246602d115f4e6e41903b`,
          data,
          config
        )
        //TODO: 받아온 데이터 바로 반영하기
        .then((result) => console.log(result.data));
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "입력한 댓글이 없습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // 댓글들을 요청하는 함수
  const requestComments = () => {
    isUpdate(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/comments/62f246602d115f4e6e41903b?sortby=${sortBy}&page=${page}`
      )
      .then((result) => {
        // setTimeout(() => {
        if (!result.data.data.length) {
          isEndUpdate(true);
        } else {
          setCommentList([...commentList, ...result.data.data]);
          setPage((preState) => preState + 1);
          isUpdate(false);
        }
        // }, 3000);
      });
  };

  // 페이지 이동시 처음 post 정보 가져오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/posts/62f246602d115f4e6e41903b`)
      .then((result) => setPostInfo(result.data));
  }, []);

  // 댓글 정보 불러오기
  useEffect(() => {
    requestComments();
  }, [sortBy]);

  // 스크롤 이벤트 함수
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !update && !endUpdate) {
      requestComments();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      {postInfo !== null ? (
        <Body>
          <Title>
            {postInfo.category.map((category, idx) => (
              <span key={idx}>{category}</span>
            ))}
            <div>{postInfo.title}</div>
          </Title>
          <Info>
            <div className={"writer"}>
              <div>작성자: {postInfo.username}</div>
              {postInfo.userId === userInfo.id ? (
                <div className={"removeButton"} onClick={handleRemoveButton}>
                  삭제하기
                </div>
              ) : null}
            </div>
            <span>{AfterOneMonth(postInfo.createdAt)}</span>
          </Info>
          <ResultFiled>
            <span>투표 상세 결과보기</span>
          </ResultFiled>
          <ContentsFiled>
            <Contents>
              <div>법안 발의 취지</div>
              <div className={"purport"}>{postInfo.purport}</div>
            </Contents>
            <Contents>
              <div>법안 발의 내용</div>
              <div className={"contents"}>{postInfo.contents}</div>
            </Contents>
            <AttachedField>
              <div>첨부파일</div>
              <AttachedFile>
                {postInfo.attachments.map((file, idx) => (
                  <div key={idx} onClick={() => handleDownloadFile(idx)}>
                    {file.fileName}
                  </div>
                ))}
              </AttachedFile>
            </AttachedField>
            <ButtonField>
              <div onClick={() => navigate("/")}>목록보기</div>
            </ButtonField>
          </ContentsFiled>
          <InputField>
            <textarea
              value={comment}
              placeholder={"댓글..."}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div onClick={handleCreateComment}>댓글</div>
          </InputField>
          <SortBy>
            <Sort
              bold={sortBy === "recent" ? "bold" : "none"}
              onClick={() => {
                if (sortBy !== "recent") {
                  setPage(1);
                  setCommentList([]);
                  isEndUpdate(false);
                  setSortBy("recent");
                }
              }}
            >
              최신순
            </Sort>
            <span> | </span>
            <Sort
              bold={sortBy === "likes" ? "bold" : "none"}
              onClick={() => {
                if (sortBy !== "likes") {
                  setPage(1);
                  setCommentList([]);
                  isEndUpdate(false);
                  setSortBy("likes");
                }
              }}
            >
              공감순
            </Sort>
          </SortBy>
          <CommentsField>
            {commentList.map((comment, idx) => (
              <Comment
                key={comment._id}
                comment={comment}
                idx={idx}
                commentList={commentList}
                setCommentList={setCommentList}
              ></Comment>
            ))}
          </CommentsField>
          {/* TODO: 추가적인 댓글 불러온다는 것을 나타내기 */}
        </Body>
      ) : (
        //TODO: 로딩페이지 대체에정
        <div>로딩화면</div>
      )}
    </>
  );
}
