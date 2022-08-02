import styled from "styled-component";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContainer = styled.div`
  width: 25rem;
  height: 32rem;
  background: #fff;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 900;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputWrap = styled.div`
  width: 100%;
  padding: 1rem 0;
  border: 1px solid #414144;

  & > form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > span {
      padding-top: 0.5rem;
      font-size: 0.8rem;
      font-weight: 700;
      color: red;
    }
  }
`;

export const InputEl = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > span {
    font-size: 0.8rem;
    font-weight: 700;
    padding-top: 0.8rem;
  }

  & > input {
    padding-top: 0.5rem;
    border: 1px solid #dfdfdf;
    height: 1.5rem;
    border-radius: 4px;
  }
`;

export const GenderButton = styled.label`
  background-color: #e6e6e6;
`;

export const Ages = styled.select`
  width: 11rem;
  height: 1.9rem;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  outline: none;
`;

export const LoginButton = styled.button`
  height: 2.5rem;
  width: 7rem;
  flex-shrink: 0;
  justify-content: center;
  /* padding: 0.8rem 2rem; */
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  color: black;
  background: #e6e6e6;
  border-radius: 4px;
  border: none;
  transition: all 0.3s;
  &:hover {
    color: #fff;
    transition: all 0.3s;
    background-color: #adadad;
  }
`;
