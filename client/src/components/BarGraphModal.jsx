import { useDispatch } from "react-redux";
import { showStatisticsModal } from "../reducers/modalSlice";
import ApexCharts from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Background,
  Container,
  Title,
  ChartField,
  Chart,
  AgeField,
  NoData,
} from "./BarGraphModalStyled";

//TODO: 통계 그래프 모달 완성하기
export default function BarGraphModal({ voteCount, statistic }) {
  const dispatch = useDispatch();
  const male = statistic.male;
  const female = statistic.female;

  return (
    <Background onClick={() => dispatch(showStatisticsModal(false))}>
      <Container onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon
          onClick={() => dispatch(showStatisticsModal(false))}
          icon={faXmark}
          size={"2x"}
        ></FontAwesomeIcon>
        {voteCount > 30 ? (
          <>
            <Title>연령별 투표 결과</Title>
            <ChartField>
              <Chart>
                <ApexCharts
                  type={"bar"}
                  series={[
                    {
                      name: "반대",
                      // data: [
                      //   male["10"].disagree,
                      //   male["20"].disagree,
                      //   male["30"].disagree,
                      //   male["40"].disagree,
                      //   male["50"].disagree,
                      //   male["60"].disagree,
                      // ],
                      data: [1],
                      color: "#A5A5A5",
                    },
                    {
                      name: "찬성",
                      // data: [
                      //   male["10"].agree,
                      //   male["20"].agree,
                      //   male["30"].agree,
                      //   male["40"].agree,
                      //   male["50"].agree,
                      //   male["60"].agree,
                      // ],
                      data: [1],
                      color: "#FB7777",
                    },
                  ]}
                  options={{
                    chart: {
                      stacked: true,
                      stackType: "100%",
                    },
                    plotOptions: {
                      bar: {
                        horizontal: true,
                        barHeight: "70%",
                      },
                    },
                    title: {
                      text: "남성",
                      align: "center",
                      style: {
                        fontSize: "20px",
                      },
                    },
                    xaxis: {
                      categories: [
                        "10대",
                        "20대",
                        "30대",
                        "40대",
                        "50대",
                        "60대이상",
                      ],
                    },
                    yaxis: {
                      show: false,
                    },
                  }}
                ></ApexCharts>
              </Chart>
              <AgeField>
                <div>10대</div>
                <div>20대</div>
                <div>30대</div>
                <div>40대</div>
                <div>50대</div>
                <div>60대 이상</div>
              </AgeField>
              <Chart>
                <ApexCharts
                  type={"bar"}
                  series={[
                    {
                      name: "찬성",
                      // data: [
                      //   female["10"].agree,
                      //   female["20"].agree,
                      //   female["30"].agree,
                      //   female["40"].agree,
                      //   female["50"].agree,
                      //   female["60"].agree,
                      // ],
                      data: [1],
                      color: "#FB7777",
                    },
                    {
                      name: "반대",
                      // data: [
                      //   female["10"].disagree,
                      //   female["20"].disagree,
                      //   female["30"].disagree,
                      //   female["40"].disagree,
                      //   female["50"].disagree,
                      //   female["60"].disagree,
                      // ],
                      data: [1],
                      color: "#A5A5A5",
                    },
                  ]}
                  options={{
                    chart: {
                      height: "300px",
                      stacked: true,
                      stackType: "100%",
                    },
                    plotOptions: {
                      bar: {
                        horizontal: true,
                        barHeight: "70%",
                      },
                    },
                    title: {
                      text: "여성",
                      align: "center",
                      style: {
                        fontSize: "20px",
                      },
                    },
                    xaxis: {
                      categories: [
                        "10대",
                        "20대",
                        "30대",
                        "40대",
                        "50대",
                        "60대이상",
                      ],
                    },
                    yaxis: {
                      show: false,
                    },
                  }}
                ></ApexCharts>
              </Chart>
            </ChartField>
          </>
        ) : (
          <NoData>
            <div>통계를 위한 투표수가 부족합니다.</div>
            <div>투표에 참여해보세요!</div>
            <img src={"images/vote.png"} alt={"투표마크"}></img>
          </NoData>
        )}
      </Container>
    </Background>
  );
}
