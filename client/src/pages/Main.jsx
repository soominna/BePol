import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../components/TopCard";
import Category from "../components/Category";
import ListCard from "../components/ListCard";
import { MainSection, Section, Text, SearchCategory } from "./MainStyled.js";
import { topCardDummyData } from "../dummyData.js";

export default function Main() {
  /*
   * 기능: 메인 페이지
   * 작성자: 송혜원
   * 📌 Top3 게시글 보이기
   * 📌 write 페이지와 연결 ✔︎
   * 📌 카테고리별 게시글 보이기
   * 📌 검색 및 정렬방식 선택
   * 📌 마감된 게시글 포함해서 보이기
   * 📌 게시글 카드 무한 스크롤로 보이기
   */
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.login.isLogin);
  const viewList = ["최신순", "마감임박순", "찬성순", "반대순"];

  //로그인 안한 회원에게 알림창 안내
  const handleLoginAlert = () => {
    Swal.fire({
      title: "로그인이 필요한 서비스 입니다",
      text: "로그인 후 사용해주세요",
      icon: "warning",
    });
  };
  const handleSearchInput = () => {};

  return (
    <>
      <MainSection>
        <Section display="grid">
          <h2>이번달 HOT🔥 모의법안</h2>
          {topCardDummyData ? (
            topCardDummyData.map((el, idx) => <TopCard key={idx} info={el} />)
          ) : (
            <h3>
              아직 인기 게시글이 없어요 🧐 <br />
              모의 법안에 적극적으로 참여해보세요!
            </h3>
          )}
        </Section>
        {isLogin ? (
          <Section
            onClick={() => {
              navigate("/write");
              // ! 쓰기 페이지 넘어갔을 때 scroll Top 고정 필요
              //   setTimeout(() => window.scrollTo(0, 0), 100);
            }}
            backgroundColor="dark"
          >
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
        <Section>
          <Category />
        </Section>
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
