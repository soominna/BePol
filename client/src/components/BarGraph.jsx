import ApexCharts from "react-apexcharts";

export default function Chart() {
  return (
    <div>
      <ApexCharts
        type={"bar"}
        series={[
          {
            name: "찬성",
            data: [85499],
            color: "#FB7777",
          },
          {
            name: "반대",
            data: [12482],
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

              barHeight: "30%",
            },
          },
          title: {
            text: "찬반투표결과",
          },
          xaxis: {
            categories: ["투표결과"],
          },
          yaxis: {
            show: false,
          },
          grid: {
            xaxis: {
              lines: {
                show: true,
              },
            },
          },
        }}
      ></ApexCharts>
    </div>
  );
}
