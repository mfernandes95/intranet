import React, { useState, useEffect } from 'react';

import { Container, Nav } from './style';

import api from '../../services/api'

import NavBar from '~/pages/Components/Nav/Admin';
import Header from '~/pages/Components/Header';
import Footer from '~/pages/Components/Footer';

import { Form } from '@rocketseat/unform';
import { Input } from 'reactstrap';

export default function Company() {

  const [company, setCompany] = useState([])
  const [username, setUsername] = useState('')
  const [company_name, setCompany_name] = useState('')
  const [password, setPassword] = useState('')
  const [employee_id, setEmployee_id] = useState('')


  useEffect(() => {
    async function loadCompanys() {
      const response = await api.get('companies')

      setCompany(response.data)
    }

    loadCompanys()
  }, [])

  async function handleSubmit() {
    await api.post('companies', {
      username,
      company_name,
      password,
      employee_id,
    })
  }

  return (
    <>
      <Container>
        <Header />
        <Nav>
          <NavBar />
        </Nav>
        {
          company.map(comp => (
            <table key={comp.id}>
              <tr>
                <th>Usename</th>
                <th>Nome da Compania</th>
                <th>Funcionario</th>
              </tr>
              <tr>
                <td>
                  {comp.username}
                </td>
                <td>
                  {comp.company_name}
                </td>
                <td>
                  {comp.employee_id}
                </td>
              </tr>
            </table>
          ))
        }
        <Form onSubmit={handleSubmit}>
          <Input
            // className="title"
            type="text"
            placeholder="Username*"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            // className="title"
            type="text"
            placeholder="Nome da Compania*"
            name="username"
            value={company_name}
            onChange={(e) => setCompany_name(e.target.value)}
          />
          <Input
            // className="title"
            type="number"
            placeholder="Funcionario*"
            name="employee_id"
            value={employee_id}
            onChange={(e) => setEmployee_id(e.target.value)}
          />
          <Input
            // className="title"
            type="password"
            placeholder="Senha*"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Create</button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}
