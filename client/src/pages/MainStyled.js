import styled, { css } from "styled-components";

export const MainSection = styled.div`
  width: 100vw;
  /* position: fixed; */
  top: 5rem;
  left: -0.01rem;
`;

//flex에 따라, grid에 따라 if문 걸어서 따로 쓸 수 있는지 문법 확인
export const Section = styled.section`
  width: 100vw;
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
      //grid일 때 적용할 스타일
      return css`
        margin: 0 2rem;
        & > h2 {
          margin: 0 0.2rem;
          font-size: 2rem;
          font-weight: 700;
        }
      `;
    } else if (props.backgroundColor === "dark") {
      //flex일 때 && 모의법안 작성 버튼 적용할 스타일
      return css`
        flex-direction: row;
        justify-content: center;
        color: red;
      `;
    } else {
      //flex일 때
      return css`
        margin: 0 2rem;
        flex-direction: row;
        justify-content: flex-start;
        color: pink;
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
