import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const [page, setPage] = useState(1);

  // 삭제하기 버튼 클릭 함수
  const handleRemoveButton = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/posts/${postId}`)
      .then((result) => console.log(result.data));
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
        `${process.env.REACT_APP_API_URI}/posts/download/62ec940c45211fbed89261fe?fileIndex=${idx}`
      )
      .then((result) => console.log(result));
  };

  // 댓글작성 버튼 눌렀을 때 함수
  const handleCreateComment = () => {
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
        `${process.env.REACT_APP_API_URI}/comments/62ec940c45211fbed89261fe`,
        data,
        config
      )
      .then((result) => console.log(result.data));
  };

  // 댓글들을 요청하는 함수
  const requestComments = () => {
    console.log("222222");
    isUpdate(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/comments/62ec940c45211fbed89261fe?sortby=${sortBy}&page=${page}`
      )
      .then((result) => {
        setCommentList([...commentList, ...result.data.data]);
        setPage((preState) => preState + 1);
        isUpdate(false);
      });
  };

  // 페이지 이동시 처음 post 정보 가져오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/posts/62ec940c45211fbed89261fe`)
      .then((result) => setPostInfo(result.data));
  }, []);

  // 댓글 정보 불러오기
  useEffect(() => {
    console.log("11111");
    window.onbeforeunload = function scrolltop() {
      window.scrollTo(0, 0);
    };
    requestComments();
  }, [sortBy]);

  // console.log(postInfo);
  // console.log(commentList);

  // 스크롤 이벤트 함수
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollTop + clientHeight + 100 > scrollHeight && !update) {
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
      {postInfo !== null && commentList.length ? (
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
          <ResultFiled>통계 결과 들어가기</ResultFiled>
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
                setPage(1);
                setCommentList([]);
                setSortBy("recent");
              }}
            >
              최신순
            </Sort>
            <span> | </span>
            <Sort
              bold={sortBy === "likes" ? "bold" : "none"}
              onClick={() => {
                setPage(1);
                setCommentList([]);
                setSortBy("likes");
              }}
            >
              공감순
            </Sort>
          </SortBy>
          <CommentsField>
            {commentList.map((comment) => (
              <Comment key={comment._id} comment={comment}></Comment>
            ))}
          </CommentsField>
          {/* TODO: 추가적인 댓글 불러온다는 것을 나타내기 */}
        </Body>
      ) : (
        //TODO: 로딩페이지 대체에정
        <div>asasdsdf</div>
      )}
    </>
  );
}
