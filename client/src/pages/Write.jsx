// import Header from "./components/Header.jsx";
import { useState } from "react";
import {
  Title,
  DropMenuContainer,
  DropMenu,
  Category,
  InputField,
  AttachedField,
} from "./WriteStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function Write() {
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [purport, setPurport] = useState("");
  const [purportLength, setPurportLength] = useState(0);
  const [contentsL, setContents] = useState("");
  const [contentsLength, setContentsLength] = useState(0);

  const isDropMenuModal = () => {}; // 카테고리 dropmenu 모달 함수

  const handleChangeFile = () => {}; // 첨부파일 변경적용 함수

  return (
    <>
      {/* <Header/> */}
      <Title>
        <div> 모의 법안 등록하기</div>
        <img src={"img/writeIcon.png"} alt={"등록아이콘"}></img>
      </Title>
      <DropMenuContainer>
        <DropMenu onClick={isDropMenuModal}>
          <div>카테고리</div>
          <FontAwesomeIcon icon={faCaretDown} size={"xs"} />
        </DropMenu>
        <div>최대 3개까지 선택가능합니다.</div>
      </DropMenuContainer>
      <Category>
        선택된 카테고리
        {category.map((select) => (
          <div>{select}</div>
        ))}
      </Category>
      <InputField>
        <div>제목</div>
        <input type={"text"} placeholder={"제목을 입력해주세요."}></input>
        <div>{titleLength}/150</div>
      </InputField>
      <InputField>
        <div>법안 발의 취지</div>
        <textarea placeholder={"취지를 입력해주세요."}></textarea>
        <div>{titleLength}/3000</div>
      </InputField>
      <InputField>
        <div>법안 발의 내용</div>
        <textarea placeholder={"내용를 입력해주세요."}></textarea>
        <div>{titleLength}/4000</div>
      </InputField>
      <AttachedField>
        <div>첨부파일</div>
        <label for={"attached"}>
          <span>파일이름</span>
          <span>첨부하기</span>
          <input
            id={"attached"}
            type={"file"}
            onChange={handleChangeFile}
            multiple={"multiple"}
          />
        </label>
      </AttachedField>
    </>
  );
}
