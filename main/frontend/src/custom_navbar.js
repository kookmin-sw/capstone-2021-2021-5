import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Container,
    Col,
    Row
  } from 'reactstrap';
  import {useHistory} from 'react-router-dom'
  
  const CNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
    let history = useHistory();
    const onLogout = () =>{
      window.sessionStorage.clear()
      history.push("/");
    }
  
    return (
      <>
      <Navbar variant="light" bg="light" light expand="md" >
        <Row >
        <Col xs="6"><NavbarBrand href="/main"><img src="logo/1x/Sentio_horizontalmdpi.png" width="100%" ></img></NavbarBrand></Col>
        <Col xs="6" className=" menu">
        <NavbarToggler onClick={toggle} className="sub_color" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-2" navbar>
            <NavItem>
                <NavLink href="/userpage"><span id="simple_txt">마이페이지</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/chatlist"><span id="simple_txt">채팅방</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/adchatlist"><span id="simple_txt">상담채팅방</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={onLogout}><span id="simple_txt">로그아웃</span></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          </Col>
        </Row>
        </Navbar>
      </>
    );
  }

export default CNavbar;