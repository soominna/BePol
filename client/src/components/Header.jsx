import axios from "axios";
import { persistor } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginSlice";
import { Container, Logo, Buttons, Button } from "./HeaderStyled";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const accessToken = useSelector((state) => state.login.accessToken);
  const user = useSelector((state) => state.user.userInfo);
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT}&response_type=code`;

  const purge = async () => {
    await persistor.purge();
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/users/logout`, {
        headers: {
          "access-token": `${accessToken}`,
        },
      })
      .then(() => {
        dispatch(logout());
        setTimeout(() => purge(), 100);
      });
  };

  return (
    <Container>
      <Link to="/">
        <Logo>
          <img src="/images/logo.png" alt="Bepol logo" />
        </Logo>
      </Link>
      {isLogin ? (
        <Buttons>
          <span>{user.userInfo.username}님</span>
          <img
            src="/images/writeHeaderIcon.png"
            alt="writing Icon"
            onClick={() => navigate("/write")}
          />
          <Button onClick={handleLogout}>로그아웃</Button>
        </Buttons>
      ) : (
        <Buttons>
          <Button onClick={() => (window.location.href = `${KAKAO_AUTH_URL}`)}>
            로그인
          </Button>
        </Buttons>
      )}
    </Container>
  );
}
