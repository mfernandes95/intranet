import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Wrapper, Content, Login, Formulario } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string('Insira um Username válido').required('É obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Wrapper>
      <Content>
        <Login className="d-flex justify-content-center">
          <Form schema={schema} onSubmit={handleSubmit}>
            <Formulario className=" isTitle card align-items-center">
              <span className="card-subtitle mb-2 text-muted">
                Bem vindo, faça o Login
              </span>
              <Input name="email" type="text" placeholder="Username" />
              <Input name="password" type="password" placeholder="Password" />
              <button type="submit">
                {loading ? 'Carregando...' : 'Entrar'}
              </button>
              <Link className="ForgetPassword" to="/ForgetPassowrd">
                Esqueceu a senha?
              </Link>
            </Formulario>
          </Form>
        </Login>
      </Content>
    </Wrapper>
  );
}
