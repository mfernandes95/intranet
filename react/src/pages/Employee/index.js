import React, { useState, useEffect, useCallback } from 'react';

import { Container, Nav, ListEmployee, CreateEmployee } from './style';

import api from '../../services/api'

import NavBar from '~/pages/Components/Nav/Admin';
import Header from '~/pages/Components/Header';
import Footer from '~/pages/Components/Footer';

import { Form } from '@rocketseat/unform';
import { Input } from 'reactstrap';



import { MdRemoveRedEye } from 'react-icons/md';
import CurrencyInput from 'react-currency-input';


export default function Employee() {

  const [employee, setEmployee] = useState([])
  const [username, setUsername] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [employeer_id, setEmployeer_id] = useState('')
  const [position_id, setPosition_id] = useState('')
  const [avatar, setAvatar] = useState([])
  const [balance, setBalance] = useState('')








  console.log('user', avatar)



  useEffect(() => {
    async function loadEmployees() {
      const response = await api.get('employees')

      setEmployee(response.data)
    }

    loadEmployees()
  }, [])

  async function handleSubmit() {
    console.log('avatar', avatar);

    await api.post('employees', {
      username,
      first_name,
      last_name,
      email,
      password,
      employeer_id,
      position_id,
      avatar,
      // balance
    })
  }

  return (
    <>
      <Container>
        <Header />
        <Nav>
          <NavBar />
        </Nav>
        <ListEmployee>
          {
            employee.map(emp => (
              <table key={emp.id}>
                <tr>
                  <th>Usename</th>
                  <th>Nome</th>
                  <th>Sobrenome</th>
                  <th>Email</th>
                  <th>Empresa</th>
                  <th>Cargo</th>
                  <th>Detalhes</th>
                </tr>
                <tr>
                  <td>
                    {emp.username}
                  </td>
                  <td>
                    {emp.first_name}
                  </td>
                  <td>
                    {emp.last_name}
                  </td>
                  <td>
                    {emp.email}
                  </td>
                  <td>
                    {emp.employeer_id}
                  </td>
                  <td>
                    {emp.position_id}
                  </td>
                  <td>
                    <MdRemoveRedEye />
                  </td>
                </tr>
              </table>
            ))
          }
        </ListEmployee>
        <CreateEmployee>
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
              placeholder="Nome*"
              name="first_name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
            <Input
              // className="title"
              type="text"
              placeholder="Sobenome*"
              name="last_name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />
            <Input
              // className="title"
              type="text"
              placeholder="Email*"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              // className="title"
              type="password"
              placeholder="Senha*"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              // className="title"
              type="number"
              placeholder="Empresa*"
              name="employeer_id"
              value={employeer_id}
              onChange={(e) => setEmployeer_id(e.target.value)}
            />
            <Input
              // className="title"
              type="number"
              placeholder="Cargo*"
              name="position_id"
              value={position_id}
              onChange={(e) => setPosition_id(e.target.value)}
            />
            {/* <Input
              // className="title"
              type="text"
              placeholder="Balance*"
              name="balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            /> */}
            <div className="custom-file mb-4">
              <Input
                className="custom-file-input"
                id="customFileLang"
                type="file"
                name="avatar"
                value={File}
                onChange={(e) => {
                  setAvatar(e.target.files[0].name)
                }}
              />
              <label className="custom-file-label" htmlFor="customFileLang">
                {avatar.length <= 0 ? 'Selecione o arquivo*' : `${avatar}`}
              </label>
            </div>
            {/* <Input
              type="file"
              name="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.files[0])}
            /> */}
            <button type="submit">Criar</button>
          </Form>
        </CreateEmployee>
      </Container>
      <Footer />
    </>
  );
};

