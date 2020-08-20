import styled from 'styled-components';

export const Container = styled.div`
  background: #1f77bc;
  padding: 0 30px 0 30px;
  height: 100%;
`;

export const Nav = styled.nav`
  ul {
    font-size: 20px;
  }

  a:hover {
    opacity: 0.6;
  }
`;

export const News = styled.div`
  img {
    border-radius: 45px;
    padding: 40px;
    // width: 2900px;
    height: 650px;
  }

  img:hover {
    opacity: 0.8;
  }
`;

export const Gadgets = styled.div`
  a:hover {
    color: #000;
    opacity: 0.6;
    text-decoration: none;
  }
`;

export const Section = styled.section`
  background: #1f77bc;
  padding: 0 30px 0 30px;
`;
