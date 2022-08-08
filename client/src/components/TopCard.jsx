import { useNavigate } from "react-router-dom";
import {
  TopCardSection,
  Card,
  CardDay,
  CardDetail,
  CardTitle,
  CardButton,
  CardIcon,
} from "./TopCardStyled";

export default function TopCard({ info }) {
  const navigate = useNavigate();

  const handleGetCardId = (e) => {
    navigate("/detail", { state: { postId: e.currentTarget.id } });
  };
  return (
    <>
      <TopCardSection>
        <Card id={info.id} onClick={(e) => handleGetCardId(e)}>
          {/* D-day 정보 받아오면 사용 */}
          {/* <CardDay>{info.date}</CardDay> */}
          <CardDay>D-10</CardDay>
          <CardTitle>
            <h3>{info.title}</h3>
          </CardTitle>
          <CardDetail>
            <CardButton>
              <CardIcon>
                <img src="/images/likesIcon.png" alt="likes Icon" />
              </CardIcon>
              <p>{info.agrees}</p>
            </CardButton>
            <CardButton>
              <CardIcon>
                <img src="/images/dislikesIcon.png" alt="dislikes Icon" />
              </CardIcon>
              <p>{info.disagrees}</p>
            </CardButton>
            <CardButton>
              <CardIcon>
                <img src="/images/commentsCntIcon.png" alt="comments Icon" />
              </CardIcon>
              <p>{info.commentsCount}</p>
            </CardButton>
          </CardDetail>
        </Card>
      </TopCardSection>
    </>
  );
}
