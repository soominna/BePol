import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Body,
  Title,
  DropMenuContainer,
  DropMenu,
  DropTitle,
  DropOptions,
  Category,
  InputField,
  Textarea,
  Length,
  AttachedField,
  AttachedInput,
  ButtonField,
} from "./WriteStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function Write() {
  const navigate = useNavigate();
  const allCategory = [
    { 0: "법률/사법" },
    { 1: "금융/경제" },
    { 2: "교육" },
    { 3: "과학기술/정보통신" },
    { 4: "외교/통일/국방" },
    { 5: "행정" },
    { 6: "문화/예술/관광" },
    { 7: "농업/식품/수산" },
    { 8: "국토/교통" },
    { 9: "산업/통상/기업" },
    { 10: "보건/복지/식품안전" },
    { 11: "환경/성평등/청소년/노동" },
    { 12: "기타" },
  ];
  const [selectedCategory, setSelectedCategory] = useState([]); // 선택된 카테고리를 저장하는 state
  const [isDropdownMenu, setIsDropdownMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [purport, setPurport] = useState("");
  const [purportLength, setPurportLength] = useState(0);
  const [contents, setContents] = useState("");
  const [contentsLength, setContentsLength] = useState(0);
  // textarea 높이조절을 하기 위한 state
  const [purportHeight, setPurportHeight] = useState("150px");
  const [contentsHeight, setContentsHeight] = useState("200px");
  const [filesName, setFilesName] = useState("");
  const [files, setFiles] = useState([]);
  const textareaRef = useRef([]);
  const inputRef = useRef([]);

  // 카테고리 선택 함수
  const handleCategory = (e, idx) => {
    if (e.target.checked && !selectedCategory.includes(e.target.value)) {
      if (selectedCategory.length < 3) {
        setSelectedCategory([...selectedCategory, e.target.value]);
      } else {
        inputRef.current[idx].checked = false;
        // 경고문이 나오게 하기
        // Swal.fire({
        //   position: "center",
        //   icon: "warning",
        //   title: "3개를 초과했습니다.",
        //   showConfirmButton: true,
        //   timer: 2000,
        // });
      }
    } else if (!e.target.checked && selectedCategory.includes(e.target.value)) {
      setSelectedCategory(
        selectedCategory.filter((el) => el !== e.target.value)
      );
    }
  };

  // 첨부파일 변경적용 함수
  const handleChangeFile = (e) => {
    // todo
    //! 파일 갯수, 크기 제한 검사 추가
    if (e.target.files.length) {
      setFiles(e.target.files);
      let fileName = "";
      if (e.target.files.length === 1) {
        fileName = e.target.files[0].name;
      } else {
        for (let i = 0; i < e.target.files.length; i++) {
          fileName += `, ${e.target.files[i].name}`;
        }
      }
      setFilesName(fileName);
    } else return;
  };

  // 취소버트늘 눌렀을 때 함수
  const handleCancle = () => {
    Swal.fire({
      title: "등록을 취소하시겠습니까?",
      text: "작성한 내용은 저장되지 않습니다.",
      icon: "warning",
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
  };

  // 법안발의 등록버튼을 눌렀을 때 함수
  const handleRegister = () => {
    // todo
    //! formdata 만들고 보내야하는 정보 append하기
  };

  return (
    <Body>
      <Title>
        <div> 모의 법안 등록하기</div>
        <img src={"images/writeIcon.png"} alt={"등록아이콘"}></img>
      </Title>
      <DropMenuContainer
        marginBottom={
          !isDropdownMenu && selectedCategory.length ? "5px" : "54.5px"
        }
      >
        <DropMenu>
          <DropTitle
            onClick={() => setIsDropdownMenu(!isDropdownMenu)}
            borderRadius={isDropdownMenu ? "none" : "10px"}
          >
            <span>카테고리</span>
            {isDropdownMenu ? (
              <FontAwesomeIcon icon={faCaretUp} size={"xs"} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} size={"xs"} />
            )}
          </DropTitle>
          {isDropdownMenu ? (
            <DropOptions>
              {allCategory.map((category, idx) => (
                <label key={idx}>
                  <input
                    type={"checkbox"}
                    ref={(el) => (inputRef.current[idx] = el)}
                    defaultChecked={
                      selectedCategory.includes(category[idx]) ? true : false
                    }
                    value={category[idx]}
                    onClick={(e) => handleCategory(e, idx)}
                  />
                  {category[idx]}
                </label>
              ))}
            </DropOptions>
          ) : null}
        </DropMenu>
        <div>최대 3개까지 선택가능합니다.</div>
      </DropMenuContainer>
      <Category>
        {isDropdownMenu
          ? null
          : selectedCategory.map((select, idx) => (
              <span key={idx}>{select}</span>
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
          {titleLength > 150 ? <div>150자를 초과했습니다.</div> : null}
          <div>{titleLength}/150</div>
        </Length>
      </InputField>
      <InputField>
        <div>법안 발의 취지</div>
        <Textarea
          ref={(el) => (textareaRef.current[0] = el)}
          height={purportLength ? purportHeight : "150px"}
          value={purport}
          placeholder={"취지를 입력해주세요."}
          onChange={(e) => {
            setPurport(e.target.value);
            setPurportLength(e.target.value.length);
            setPurportHeight(textareaRef.current[0].scrollHeight - 10 + "px");
          }}
        ></Textarea>
        <Length color={purportLength > 3000 ? "red" : "black"}>
          {purportLength > 3000 ? <div>3000자를 초과했습니다.</div> : null}
          <div>{purportLength}/3000</div>
        </Length>
      </InputField>
      <InputField>
        <div>법안 발의 내용</div>
        <Textarea
          ref={(el) => (textareaRef.current[1] = el)}
          height={contentsLength ? contentsHeight : "200px"}
          value={contents}
          placeholder={"내용를 입력해주세요."}
          onChange={(e) => {
            setContents(e.target.value);
            setContentsLength(e.target.value.length);
            setContentsHeight(textareaRef.current[1].scrollHeight - 10 + "px");
          }}
        ></Textarea>
        <Length color={contentsLength > 4000 ? "red" : "black"}>
          {contentsLength > 4000 ? <div>4000자를 초과했습니다.</div> : null}
          <div>{contentsLength}/4000</div>
        </Length>
      </InputField>
      <AttachedField>
        <div>첨부파일</div>
        <AttachedInput for={"attached"}>
          <div>
            <span>{filesName}</span>
            <span>첨부하기</span>
          </div>
          <input
            id={"attached"}
            type={"file"}
            accept={"image/png"} //! 파일유형 제한
            onChange={handleChangeFile}
            multiple={"multiple"}
          />
        </AttachedInput>
      </AttachedField>
      <ButtonField>
        <div type={"button"} onClick={handleCancle}>
          취소하기
        </div>
        <div type={"button"} onClick={handleRegister}>
          등록하기
        </div>
      </ButtonField>
    </Body>
  );
}
