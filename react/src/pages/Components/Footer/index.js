import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBNavLink } from 'mdbreact';

import {
  FaMapMarkerAlt,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
} from 'react-icons/fa';

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="3">
            <MDBNavLink to="/dashboard/employee">
              <img width="200" src={logo} alt="Logo" />
            </MDBNavLink>
          </MDBCol>
          <MDBCol
            md="6"
            className="d-flex justify-content-center align-items-center"
          >
            {/* <ul className="">
              <li className="list-unstyled">
                <a href="#!" className="p-2">
                  Trabalhe conosco
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="p-2">
                  Fale Conosco
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="p-2">
                  xxxx
                </a>
              </li>
            </ul> */}
          </MDBCol>
          <MDBCol
            md="3"
            className="d-flex justify-content-end align-items-center"
          >
            <ul className="d-flex">
              <li className="list-unstyled">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/maps/dir/-22.8386594,-47.048581/Intranet+group+google+maps/@-22.8398697,-47.056456,15z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x94c8c61af3a26a8d:0xb15d963549506de8!2m2!1d-47.0416103!2d-22.8457311"
                  className="p-2"
                >
                  <FaMapMarkerAlt size={40} />
                </a>
              </li>
              <li className="list-unstyled">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/channel/UC1wH3AYIIfBCoq5ov7Zm7Dw"
                  className="p-2"
                >
                  <FaYoutube size={40} />
                </a>
              </li>
              <li className="list-unstyled">
                <a target="_blank" rel="noopener noreferrer" className="p-2">
                  <FaFacebook size={40} />
                </a>
              </li>
              <li className="list-unstyled">
                <a target="_blank" rel="noopener noreferrer" className="p-2">
                  <FaLinkedin size={40} />
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {/* <div className="footer-copyright text-center">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div> */}
    </MDBFooter>
  );
};

export default FooterPage;
