import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  // MDBDropdown,
  // MDBDropdownToggle,
  // MDBDropdownMenu,
  // MDBDropdownItem,
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
              <MDBNavLink to="/dashboard/employee">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/company">Company</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/project">Projetos</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/cafepalestra">Café Palestra</MDBNavLink>
            </MDBNavItem>
            {/* <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">Departamentos</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem href="#!">RH</MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem href="#!">TIC</MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem href="#!">Financeiro</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem> */}
            {/* <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">Learning</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem href="#!">RH</MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem href="#!">TIC</MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem href="#!">Financeiro</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem> */}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavbarPage;
