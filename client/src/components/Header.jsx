import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginSlice";
import { Container, Logo, Buttons, Button } from "./HeaderStyled";

export default function Header() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const accessToken = useSelector((state) => state.login.accessToken);
  const username = useSelector((state) => state.user.username);

  return (
    <Container>
      {/* <img src="/images/logo.png" alt="Bepol logo" /> */}
      <Link to="/">
        <Logo>
          <img src="/images/logo.png" alt="Bepol logo" />
        </Logo>
      </Link>
      {isLogin ? (
        <Buttons>
          {/* <span>{username}님</span> */}
          <span>정치인 님</span>
          <img src="/images/writeIcon.png" alt="writing Icon" />
        </Buttons>
      ) : (
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Buttons>
            <Button>로그인</Button>
          </Buttons>
        </Link>
      )}
    </Container>
  );
}
