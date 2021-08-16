import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../images/01-logo.png';
import Account from '../images/account.png'
import Notification from '../images/noti.png'

// const StyledNav = styled.div`
//   position: sticky; 
//   top: 0; 
//   z-index: 10;
// `

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
`

const IconContainer = styled.div`
  display: flex;
  padding-top: 6px;
  padding-right: 16px;
`

const Navbar = () => (
  <div>
    <ul className="nav nav-tabs bg-secondary">
      <Container>
        <li className="nav-item" style={{height:"45px"}} >
          <Link className="nav-link" to="/home">
            <img src={Logo} alt="logo" width="100%" height="30px" style={{padding: "0 0 0 0"}} />
          </Link>
        </li>

        <IconContainer>
          <li className="nav-item">
            <img src={Notification} alt="noti" width="30px" style={{marginRight: "20px", marginTop: "2px"}} />
          </li>

          <li className="nav-item">
            <img src={Account} alt="account" width="30px" />
          </li>
        </IconContainer>
      </Container>
    </ul>
  </div>
);

export default withRouter(Navbar);