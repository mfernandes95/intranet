import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export const Login = styled.div``;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 200px;
  width: 500px;
  height: 450px;
  background-color: rgba(255, 255, 255, 0.8) !important;

  img {
    margin-top: 20px;
    width: 200px;
  }

  span {
    color: #1f77bc;
    align-self: flex-center;
    margin: 0 0 10px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
  }

  .ForgetPassword {
    color: #1f77bc;
    font-weight: bold;
    text-decoration: none;
    transition: 0.02s;

    &:hover {
      color: ${darken(0.04, '#1f77bc')};
    }
  }

  input {
    background: #fff;
    border: 1px solid #1f77bc;
    border-radius: 5px;
    height: 40px;
    width: 350px;
    padding: 0 15px;
    color: #000;
    margin: 0 0 10px;

    &::placeholder {
      color: #a6a6a6;
    }
  }
  button {
    width: 350px;
    margin: 5px 0 20px;
    height: 44px;
    background: #1f77bc;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#1f77bc')};
    }
  }
`;
