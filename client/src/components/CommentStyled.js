import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 15px;
`;

export const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;
`;

export const Writer = styled.div`
  display: flex;
  align-items: center;
  div {
    font-size: 20px;
  }
`;

export const ProsAndCons = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background: #fb7777;
  /* background: ${(props) => props.background} */
  margin-right: 10px;
`;

export const ModifyAndDelete = styled.div`
  display: flex;
  span {
    font-size: 15px;
    &:first-child {
      cursor: pointer;
      margin-right: 5px;
    }
    &:last-child {
      cursor: pointer;
      margin-left: 5px;
    }
  }
`;

export const Contents = styled.div`
  background: #f9f9f9;
  border-radius: 5px;
  padding: 15px;
  div {
    &:first-child {
      margin-bottom: 5px;
    }
    &:last-child {
      display: flex;
    }
  }
  img {
    width: 20px;
    height: 20px;
  }
`;
