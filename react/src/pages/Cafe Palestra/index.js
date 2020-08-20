import React from 'react';

import { Container, Nav } from './style';

import NavBar from '~/pages/Components/Nav/Employee';
import Header from '~/pages/Components/Header';
import Footer from '~/pages/Components/Footer';

export default function CafePalestra() {
  return (
    <>
      <Container>
        <Header />
        <Nav>
          <NavBar />
        </Nav>
      </Container>
      <Footer />
    </>
  );
}
