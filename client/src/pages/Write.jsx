// import Header from "./components/Header.jsx";
import { useState, useRef, useCallback } from "react";
import {
  Body,
  Title,
  DropMenuContainer,
  DropMenu,
  Category,
  InputField,
  Textarea,
  Length,
  AttachedField,
  ButtonField,
} from "./WriteStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function Write() {
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [purport, setPurport] = useState("");
  const [purportLength, setPurportLength] = useState(0);
  const [contents, setContents] = useState("");
  const [contentsLength, setContentsLength] = useState(0);
  // 줄 수를 계산해서 저장할 변수
  const [purportHeight, setPurportHeight] = useState("150px");
  const [contentsHeight, setContentsHeight] = useState("200px");
  const purportTextareaRef = useRef(null);
  const contentsTextareaRef = useRef(null);

  const isDropMenuModal = () => {}; // 카테고리 dropmenu 모달 함수

  const handleChangeFile = () => {}; // 첨부파일 변경적용 함수

  const handleCancle = () => {}; // 취소버트늘 눌렀을 때 함수

  const handleRegister = () => {}; // 법안발의 등록버튼을 눌렀을 때 함수

  return (
    <Body>
      <Title>
        <div> 모의 법안 등록하기</div>
        <img src={"images/writeIcon.png"} alt={"등록아이콘"}></img>
      </Title>
      <DropMenuContainer>
        <DropMenu onClick={isDropMenuModal}>
          <div>카테고리</div>
          <FontAwesomeIcon icon={faCaretDown} size={"xs"} />
        </DropMenu>
        <div>최대 3개까지 선택가능합니다.</div>
      </DropMenuContainer>
      <Category>
        <span>선택된 카테고리</span>
        {category.map((select) => (
          <span>{select}</span>
        ))}
      </Category>
      <InputField>
        <div>제목</div>
        <input
          value={title}
          type={"text"}
          placeholder={"제목을 입력해주세요."}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleLength(e.target.value.length);
          }}
        ></input>
        <Length color={titleLength > 150 ? "red" : "black"}>
          {titleLength}/150
        </Length>
      </InputField>
      <InputField>
        <div>법안 발의 취지</div>
        <Textarea
          ref={purportTextareaRef}
          height={purportLength ? purportHeight : "150px"}
          value={purport}
          placeholder={"취지를 입력해주세요."}
          onChange={(e) => {
            setPurport(e.target.value);
            setPurportLength(e.target.value.length);
            setPurportHeight(
              purportTextareaRef.current.scrollHeight - 10 + "px"
            );
          }}
        ></Textarea>
        <Length color={purportLength > 3000 ? "red" : "black"}>
          {purportLength}/3000
        </Length>
      </InputField>
      <InputField>
        <div>법안 발의 내용</div>
        <Textarea
          ref={contentsTextareaRef}
          height={contentsLength ? contentsHeight : "200px"}
          value={contents}
          placeholder={"내용를 입력해주세요."}
          onChange={(e) => {
            setContents(e.target.value);
            setContentsLength(e.target.value.length);
            setContentsHeight(
              contentsTextareaRef.current.scrollHeight - 10 + "px"
            );
          }}
        ></Textarea>
        <Length color={contentsLength > 4000 ? "red" : "black"}>
          {contentsLength}/4000
        </Length>
      </InputField>
      <AttachedField>
        <div>첨부파일</div>
        <label for={"attached"}>
          <div>
            <span>파일이름</span>
            <span>첨부하기</span>
          </div>
          <input
            id={"attached"}
            type={"file"}
            onChange={handleChangeFile}
            multiple={"multiple"}
          />
        </label>
      </AttachedField>
      <ButtonField>
        <button type={"button"} onClick={handleCancle}>
          취소하기
        </button>
        <button type={"button"} onClick={handleRegister}>
          등록하기
        </button>
      </ButtonField>
    </Body>
  );
}
