import styled from "styled-components";

export const Title = styled.div`
  border: 1px solid red;
  display: flex;
  font-weight: bold;
  font-size: 30px;
  img {
    border: 1px solid red;
    width: 30px;
    height: 30px;
  }
`;

export const DropMenuContainer = styled.div`
  display: flex;
`;

export const DropMenu = styled.div`
  border: 1px solid #b1b1b1;
  background: #f1f1f1;
  border-radius: 20px;
  display: flex;
  width: 200px;
  height: 25px;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 0 10px;
`;

export const Category = styled.div`
  border: 1px solid red;
  display: flex;
`;

export const InputField = styled.div`
  border: 1px solid red;
`;

export const AttachedField = styled.div`
  border: 1px solid red;
  display: flex;
  label {
    border: 1px solid red;
    display: flex;
    input {
      display: none;
    }
  }
`;
