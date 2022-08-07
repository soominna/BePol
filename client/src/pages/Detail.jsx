import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Body, ButtonField } from "./WriteStyled";
import {
  Title,
  Info,
  ResultFiled,
  ContentsFiled,
  Contents,
  AttachedField,
  AttachedFile,
} from "./DetailStyled";

export default function Detail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);

  // 삭제하기 버튼 클릭 함수
  const handleRemoveButton = () => {};

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
  const handleDownloadFile = () => {};

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/posts/62ec940c45211fbed89261fe`)
      .then((result) => setPostInfo(result.data));
  }, []);
  console.log(postInfo);

  return (
    <>
      {postInfo === null ? null : (
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
              <div onClick={handleRemoveButton}>삭제하기</div>
            </div>
            <span>{AfterOneMonth(postInfo.createdAt)}</span>
          </Info>
          <ResultFiled>통계 결과 들어가기</ResultFiled>
          <ContentsFiled>
            <Contents>
              <div>법안 발의 취지</div>
              <div>{postInfo.purport}</div>
            </Contents>
            <Contents>
              <div>법안 발의 내용</div>
              <div>{postInfo.contents}</div>
            </Contents>
            <AttachedField>
              <div>첨부파일</div>
              <AttachedFile>
                {postInfo.attachments.map((file, idx) => (
                  <div key={idx} onClick={handleDownloadFile}>
                    {file.fileName}
                  </div>
                ))}
              </AttachedFile>
            </AttachedField>
            <ButtonField>
              <div onClick={() => navigate("/")}>목록보기</div>
            </ButtonField>
          </ContentsFiled>
        </Body>
      )}
    </>
  );
}
