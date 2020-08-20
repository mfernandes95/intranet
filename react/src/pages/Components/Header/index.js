import React from 'react';
import { useDispatch } from 'react-redux';
import Notifications from '~/pages/Components/Notifications';
import { signOut } from '~/store/modules/auth/actions';

import { FaCalendar, FaSearch, FaUser } from 'react-icons/fa';

import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';
// import { BrowserRouter as Router } from 'react-router-dom';

// import React from 'react';

// import { Container } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <>
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarToggler />
        <MDBCollapse id="navbarCollapse3" navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/dashboard/employee">
                <img width="300" src={logo} alt="Logo" />
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light px-3" to="#!">
                <FaCalendar size={35} />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light px-3" to="#!">
                <FaSearch size={35} />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light px-3" to="#!">
                <Notifications />
                {/* <FaBell size={35} /> */}
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret className="px-3">
                  <FaUser size={35} />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
                  <MDBDropdownItem divider />
                  {/* <MDBDropdownItem href="#!">Another</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem href="#!">Something</MDBDropdownItem>
                <MDBDropdownItem divider /> */}
                  <MDBDropdownItem onClick={handleSignOut}>
                    Sair
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </>
  );
}

// class Header extends Component {
//   state = {
//     isOpen: false,
//   };

//   toggleCollapse = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//   };

//   render() {
//     return (
// <>
//   <MDBNavbar color="default-color" dark expand="md">
//     <MDBNavbarToggler onClick={this.toggleCollapse} />
//     <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
//       <MDBNavbarNav left>
//         <MDBNavItem>
//           <MDBNavLink to="/dashboard/employee">
//             <img width="300" src={logo} alt="Logo" />
//           </MDBNavLink>
//         </MDBNavItem>
//       </MDBNavbarNav>
//       <MDBNavbarNav right>
//         <MDBNavItem>
//           <MDBNavLink className="waves-effect waves-light px-3" to="#!">
//             <FaCalendar size={35} />
//           </MDBNavLink>
//         </MDBNavItem>
//         <MDBNavItem>
//           <MDBNavLink className="waves-effect waves-light px-3" to="#!">
//             <FaSearch size={35} />
//           </MDBNavLink>
//         </MDBNavItem>
//         <MDBNavItem>
//           <MDBNavLink className="waves-effect waves-light px-3" to="#!">
//             <Notifications />
//             {/* <FaBell size={35} /> */}
//           </MDBNavLink>
//         </MDBNavItem>
//         <MDBNavItem>
//           <MDBDropdown>
//             <MDBDropdownToggle nav caret className="px-3">
//               <FaUser size={35} />
//             </MDBDropdownToggle>
//             <MDBDropdownMenu className="dropdown-default">
//               <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
//               <MDBDropdownItem divider />
//               {/* <MDBDropdownItem href="#!">Another</MDBDropdownItem>
//               <MDBDropdownItem divider />
//               <MDBDropdownItem href="#!">Something</MDBDropdownItem>
//               <MDBDropdownItem divider /> */}
//               <MDBDropdownItem>Log Out</MDBDropdownItem>
//             </MDBDropdownMenu>
//           </MDBDropdown>
//         </MDBNavItem>
//       </MDBNavbarNav>
//     </MDBCollapse>
//   </MDBNavbar>
// </>
//     );
//   }
// }

// export default Header;
