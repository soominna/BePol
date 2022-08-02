import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loginSlice";
import { getUserInfo } from "../reducers/userInfoSlice";
import { showLoginModal } from "../reducers/modalSlice";
import {
  ModalBackground,
  ModalContainer,
  ModalText,
  InputWrap,
  InputEl,
  GenderButton,
  Ages,
  LoginButton,
} from "./ModalStyled";

export default function LoginModal() {
  /*
    * 기능: 로그인 회원정보 추가 입력
    * 작성자: 송혜원
    * 📌 성별, 연령대 정보 입력 ✔︎
    * 📌 서버로 POST 요청 후 로그인 
    * 📌 모달 창 스타일 

     */
  const dispatch = useDispatch();
  const ages = [10, 20, 30, 40, 50, 60];
  const [loginInfo, setLoginInfo] = useState({
    gender: "", //String
    age: 0, //Integer
  });

  //입력값 관리 함수
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  //로그인 관리 함수
  const handleLogin = () => {
    if (loginInfo.gender && loginInfo.age) {
      // ! 어떤 api로 요청 보내야할지 정해야함
      axios
        .post(`${process.env.REACT_APP_API_URI}/users/login`, {
          gender: loginInfo.gender,
          age: loginInfo.age,
        })
        .then((result) => {
          let data = {
            //userData가 성공적으로 온다면
          };
          //응답 받은 유저 정보 상태로 저장
          dispatch(getUserInfo(data));
          dispatch(login(result.headers.get("access-token")));
        });
    }
  };
  return (
    <>
      <ModalBackground onClick={() => dispatch(showLoginModal(false))} />
      <ModalContainer>
        <span onClick={() => dispatch(showLoginModal(false))}>&times;</span>
        <ModalText>
          <h2>회원정보입력</h2>
          <p>서비스를 이용하기 위해서는 추가정보 입력이 필요합니다</p>
        </ModalText>
        <InputWrap>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputEl>
              <span>성별</span>
              <GenderButton>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleInputValue("gender")}
                />
                여성
              </GenderButton>
              <GenderButton>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleInputValue("gender")}
                />
                남성
              </GenderButton>
            </InputEl>
            <InputEl>
              <span>연령대</span>
              <Ages onChange={handleInputValue("age")}>
                {ages.map((el) => (
                  <option value={el}>{el}대</option>
                ))}
              </Ages>
            </InputEl>
          </form>
        </InputWrap>
        <LoginButton type="submit" onClick={handleLogin}>
          로그인 완료하기
        </LoginButton>
      </ModalContainer>
    </>
  );
}
