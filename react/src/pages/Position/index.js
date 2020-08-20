import React, { useState, useEffect } from 'react';

import { Container, Nav } from './style';

import api from '../../services/api'

import NavBar from '~/pages/Components/Nav/Admin';
import Header from '~/pages/Components/Header';
import Footer from '~/pages/Components/Footer';

import { Form } from '@rocketseat/unform';
import { Input } from 'reactstrap';

export default function Position() {

  const [position, setPosition] = useState([])
  const [position_name, setPosition_name] = useState('')
  const [level, setLevel] = useState('')


  useEffect(() => {
    async function loadPositions() {
      const response = await api.get('positions')

      setPosition(response.data)
    }

    loadPositions()
  }, [])

  async function handleSubmit() {
    await api.post('positions', {
      position_name,
      level
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
          position.map(pos => (
            <table key={pos.id}>
              <tr>
                <th>Position</th>
                <th>Level</th>
              </tr>
              <tr>
                <td>{pos.position}</td>
                <td>{pos.level}</td>

              </tr>
            </table>
          ))
        }
        <Form onSubmit={handleSubmit}>
          <Input
            // className="title"
            type="text"
            placeholder="Nome do cargo*"
            name="position_name"
            value={position_name}
            onChange={(e) => setPosition_name(e.target.value)}
          />
          <Input
            // className="title"
            type="number"
            placeholder="Level*"
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
          <button type="submit">Criar</button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}
