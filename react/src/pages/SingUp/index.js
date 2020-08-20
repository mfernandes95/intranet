import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo-Intranet.png';

export default function SignUp() {
  return (
    <>
      <img src={logo} width="200" alt="LogoCielo" />

      <form>
        <input type="email" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <button type="submit">Logar</button>
        <Link to="/register">Create account</Link>
      </form>
    </>
  );
}
