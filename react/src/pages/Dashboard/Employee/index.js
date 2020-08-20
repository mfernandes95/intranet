import React from 'react';

import { Container, Nav, Gadgets, News } from './style';
// eslint-disable-next-line import/no-unresolved
import NavBar from '~/pages/Components/Nav/Employee';
import Header from '~/pages/Components/Header';
import Footer from '~/pages/Components/Footer';
import New from '~/pages/Components/NewsCarousel';
import Card from '~/pages/Components/Card';

function DashboardEmployee() {
  return (
    <>
      <Container>
        <Header />
        <Nav>
          <NavBar />
        </Nav>
        <News>
          <New />
        </News>
        <Gadgets>
          <Card />
        </Gadgets>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardEmployee;
