import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../components/TopCard";
import Category from "../components/Category";
import ListCard from "../components/ListCard";
import { MainSection, Section, Text, SearchCategory } from "./MainStyled.js";

export default function Main() {
  const navigate = useNavigate();
  const viewList = ["최신순", "마감임박순", "찬성순", "반대순"];

  const isLogin = useSelector((state) => state.login.isLogin);

  //로그인 안한 회원에게 알림창 안내
  const handleLoginAlert = () => {};
  const handleSearchInput = () => {};

  return (
    <>
      <MainSection>
        <Section display="grid">
          <h2>이번달 HOT🔥 게시글</h2>
          <TopCard />
        </Section>
        {isLogin ? (
          <Section onClick={() => navigate("/write")} backgroundColor="dark">
            <Text>
              <span>모의법안 발의하기</span>
              <img src="/images/judgeIcon.png" alt="Judge Icon" />
            </Text>
          </Section>
        ) : (
          <Section onClick={handleLoginAlert} backgroundColor="dark">
            <Text>
              <span>모의법안 발의하기</span>
              <img src="/images/judgeIcon.png" alt="Judge Icon" />
            </Text>
          </Section>
        )}
        <Section>
          <h2>모의법안 둘러보기</h2>
          <img src="/images/binocularsIcon.png" alt="Binoculars Icon" />
        </Section>
        <Category />
        <Section>
          {/* Enter로 값 입력받기 */}
          <input type="text" onChange={handleSearchInput} />
          {/* 체크박스 필요 */}
          <p>마감된 법안 같이보기</p>
          <SearchCategory>
            {viewList.map((el, idx) => (
              <option key={idx} value={el}>
                {el}
              </option>
            ))}
          </SearchCategory>
        </Section>
        <Section display="grid">
          <ListCard />
        </Section>
      </MainSection>
    </>
  );
}
