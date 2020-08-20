import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact';

import {
  FaTrello,
  FaSlackHash,
  FaMailBulk,
  FaGlobe,
  // FaClock,
  // FaNewspaper,
} from 'react-icons/fa';

// import './style';

const CardExample = () => {
  return (
    <MDBCol className="d-flex justify-content-around pb-4">
      {/* <MDBCard style={{ width: '12rem', height: '8rem' }}>
        <MDBBtn href="#">
          <MDBCardBody className="p-0">
            <FaNewspaper size={60} className="mb-4" />
            <MDBCardTitle className="m-0">News</MDBCardTitle>
          </MDBCardBody>
        </MDBBtn>
      </MDBCard> */}
      <MDBCard style={{ width: '12rem', height: '8rem' }}>
        <MDBBtn
          target="_blank"
          rel="noopener noreferrer"
          href="https://outlook.office365.com"
        >
          <MDBCardBody className="p-0">
            <FaMailBulk size={60} className="mb-4" />
            <MDBCardTitle className="m-0">Email</MDBCardTitle>
          </MDBCardBody>
        </MDBBtn>
      </MDBCard>
      <MDBCard style={{ width: '12rem', height: '8rem' }}>
        <MDBBtn
          target="_blank"
          rel="noopener noreferrer"
          href="https://trello.com"
        >
          <MDBCardBody className="p-0">
            <FaTrello size={60} className="mb-4" />
            <MDBCardTitle className="m-0">Trello</MDBCardTitle>
          </MDBCardBody>
        </MDBBtn>
      </MDBCard>
      <MDBCard style={{ width: '12rem', height: '8rem' }}>
        <MDBBtn
          target="_blank"
          rel="noopener noreferrer"
          href="https://slack.com/intl/pt-br/"
        >
          <MDBCardBody className="p-0">
            <FaSlackHash size={60} className="mb-4" />
            <MDBCardTitle className="m-0">Slack</MDBCardTitle>
          </MDBCardBody>
        </MDBBtn>
      </MDBCard>
      {/* <MDBCard style={{ width: '12rem', height: '8rem' }}>
        <MDBBtn href="#">
          <MDBCardBody className="p-0">
            <FaClock size={60} className="mb-4" />
            <MDBCardTitle className="m-0">Point</MDBCardTitle>
          </MDBCardBody>
        </MDBBtn>
      </MDBCard> */}
      <MDBCard style={{ width: '12rem', height: '8rem' }}>
        <MDBBtn
          target="_blank"
          rel="noopener noreferrer"
          href="http://Intranet.com.br/"
        >
          <MDBCardBody className="p-0">
            <FaGlobe size={60} className="mb-4" />
            <MDBCardTitle className="m-0">Website</MDBCardTitle>
          </MDBCardBody>
        </MDBBtn>
      </MDBCard>
    </MDBCol>
  );
};

export default CardExample;
