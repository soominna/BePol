import styled from "styled-components";

export const Title = styled.div`
  margin-bottom: 50px;
  span {
    &:first-child {
      margin-left: 30px;
    }
    margin-right: 10px;
  }
  div {
    font-size: 35px;
    text-align: center;
    margin-top: 15px;
  }
`;

export const Info = styled.div`
  .writer {
    display: flex;
    justify-content: space-between;
    margin: 0 30px 0 30px;
    div {
      &:first-child {
        font-weight: bold;
      }
      &:last-child {
        border-radius: 10px;
        padding: 5px 10px 5px 10px;
        background: #cccccc;
        cursor: pointer;
      }
    }
  }
  span {
    margin-left: 30px;
  }
`;

export const ResultFiled = styled.div`
  border: 1px solid red;
  height: 200px;
`;

export const ContentsFiled = styled.div`
  background: #f9f9f9;
  padding: 30px 0 30px 0;
`;

export const Contents = styled.div`
  border-bottom: 1px solid #a09e9e;
  width: 90%;
  margin: auto;
  margin-bottom: 30px;
  div {
    &:first-child {
      font-size: 20px;
      margin-bottom: 10px;
    }
    &:last-child {
      margin-bottom: 30px;
    }
  }
`;

export const AttachedField = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  div {
    font-size: 20px;
  }
`;

export const AttachedFile = styled.div`
  margin-left: 100px;
  div {
    color: #0e5ebc;
    font-size: 15px;
    cursor: pointer;
  }
`;
