import styled, { css } from "styled-components";

export const MainSection = styled.div`
  width: 70%;
  min-width: 880px;
  margin: auto;
  /* position: fixed; */
  /* top: 5rem;
  left: -0.01rem; */
`;
export const Section = styled.section`
  width: 100%;
  padding: 1rem 0;
  display: ${(props) => (props.display ? "grid" : "flex")};
  background-color: ${(props) => (props.backgroundColor ? "#414144" : "white")};
  & > img {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 1rem;
  }
  ${(props) => {
    if (props.display === "grid") {
      //grid일때
      if (props.list) {
        return css`
          grid-template-columns: 1fr 1fr 1fr;
          grid-auto-rows: minmax(22rem, auto);
          & > h2 {
            margin: 0 0.2rem;
            font-size: 2rem;
            font-weight: 700;
          }
          & > h3 {
            margin: 3rem;
            padding: 5rem;
            background-color: #f5f5f5;
            border-radius: 20px;
            font-size: 1.5rem;
            text-align: center;
          }
        `;
      }
      return css`
        & > h2 {
          margin: 0 0.2rem;
          font-size: 2rem;
          font-weight: 700;
        }
        & > h3 {
          margin: 3rem;
          padding: 5rem;
          background-color: #f5f5f5;
          border-radius: 20px;
          font-size: 1.5rem;
          text-align: center;
        }
      `;
    } else if (props.backgroundColor === "dark") {
      //flex일 때 && 모의법안 작성 버튼 적용할 스타일
      return css`
        flex-direction: row;
        justify-content: center;
      `;
    } else {
      //flex일 때
      return css`
        margin: 1rem 2rem;
        flex-direction: row;
        justify-content: flex-start;
        & > h2 {
          margin: 0 0.2rem;
          font-size: 2rem;
          font-weight: 700;
        }
        & > img {
          margin: 0;
        }
      `;
    }
  }}
`;

export const Text = styled.div`
  font-size: 2.5rem;
  font-weight: 400;
  color: #ebe4e4;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > img {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const SearchCategory = styled.select`
  width: 7rem;
  height: 2.4rem;
  font-size: 1rem;
  font-weight: 500;
  border: 1.5px solid #dfdfdf;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  padding: 0 0.5rem 0 0.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("/images/downArrow.png") no-repeat 90% 50%;
  background-size: auto 50%;

  & > option {
    @import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
    font-family: "Open Sans", sans-serif;
  }
`;
