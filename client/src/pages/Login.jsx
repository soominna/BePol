import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginContainer } from "./LoginStyled";
import { getUserInfo } from "../reducers/userInfoSlice";
import { login } from "../reducers/loginSlice";
import { showLoginModal } from "../reducers/modalSlice";

export default function Login() {
  /*
    * 기능: 카카오 소셜 로그인 
    * 작성자: 송혜원
    * 📌 카카오 로그인 동의 ✔︎
    * 📌 카카오 로그인 전 추가 정보 입력 ✔︎
    * kakao API로 code 요청 후 서버로 로그인 요청

     */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const code = new URL(window.location.href).searchParams.get("code");

  const handleKakaoLogin = () => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/users/login`, {
        code: code,
      })
      .then((result) => {
        //status가 200일 때 -> 바로 메인페이지 (이미 가입한 회원)
        if (result.status === 200) {
          //응답 받은 회원 정보를 dispatch를 이용해 userInfo state에 저장
          dispatch(getUserInfo(result.data.data));
          //서버에서 보내준 header의 accessToken 값 dispatch로 login 상태 업데이트
          dispatch(login(result.headers.get("access-token")));
        }
        //status가 201일 때 -> 추가 입력 로그인 모달 (아직 가입하지 않은 회원)
        else if (result.status === 201) {
          //메인페이지로 돌아간 후 로그인 모달창 띄우기
          navigate("/", { replace: true });
          setTimeout(() => dispatch(showLoginModal(true)), 500);
        }
      });
  };
  handleKakaoLogin();

  return (
    <>
      <LoginContainer>
        <h1>Bepol</h1>
        <h2>당신만의 법안을 발의해보세요</h2>
      </LoginContainer>
    </>
  );
}
