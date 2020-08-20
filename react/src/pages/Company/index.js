import React from 'react';

import { Container, Section, Nav } from './style';
import NavBar from '~/pages/Components/Nav/Employee';
import Header from '~/pages/Components/Header';
import Footer from '~/pages/Components/Footer';

export default function Company() {
  return (
    <>
      <Container>
        <Header />
        <Nav>
          <NavBar />
        </Nav>
        <Section>
          <></>
        </Section>
      </Container>
      <>
        <Footer />
      </>
    </>
  );
}
