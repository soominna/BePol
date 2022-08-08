import styled from "styled-components";

export const Title = styled.div`
  margin: 0 0 50px 0;
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
      padding-bottom: 10px;
      &:first-child {
        font-weight: bold;
      }
      &.removeButton {
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
    &.purport {
      min-height: 60px;
    }
    &.contents {
      min-height: 180px;
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

export const InputField = styled.div`
  border-bottom: 1px solid #a09e9e;
  width: 90%;
  margin: auto;
  display: flex;
  margin-top: 40px;
  padding-bottom: 20px;
  textarea {
    background: #f9f9f9;
    flex: 9 0 0;
    border: none;
    padding: 10px;
    resize: none;
    outline: none;
    height: 60px;
    font-size: 16px;
  }
  div {
    flex: 1 0 0;
    background: #474747;
    color: #ffffff;
    margin-left: 10px;
    text-align: center;
    padding: 5px 0 5px 0;
    border-radius: 10px;
    height: 20px;
    cursor: pointer;
  }
`;

export const SortBy = styled.div`
  border: 1px solid red;
  width: 90%;
  margin: auto;
`;

export const Sort = styled.span`
  cursor: pointer;
  font-weight: ${(props) => props.bold};
`;

export const CommentsField = styled.div`
  border: 1px solid red;
`;
