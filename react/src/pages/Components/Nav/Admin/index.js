import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
} from 'mdbreact';
// import { BrowserRouter as Router } from 'react-router-dom';

class NavbarPage extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/dashboard/admin">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/employee">Employee</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/employeer">Employeer</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/companys">Companys</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/position">Posititon</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavbarPage;
