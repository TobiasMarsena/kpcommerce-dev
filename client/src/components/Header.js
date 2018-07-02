import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'mdbreact';
import { connect } from 'react-redux'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    renderContentRight() {
      switch(this.props.auth) {
      case null:
        return ''
      case false:
        return <NavItem>
                <Button href="/login">Login</Button>
               </NavItem>
      default:
        return <NavItem>
                <Button href="/api/logout">Logout</Button>
               </NavItem>
      }
    }

    renderContentDropdown() {
      switch(this.props.auth) {
      case null:
        return ''
      case false:
        return ''
      default:
        return <NavItem>
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle nav caret>Dropdown</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="/profile">Profile</DropdownItem>
                    <DropdownItem href="/media">Instagram</DropdownItem>
                    <DropdownItem href="/subscriptions">Youtube</DropdownItem>
                    <DropdownItem href="#">Something else here</DropdownItem>
                  </DropdownMenu>
                  </Dropdown>
                </NavItem>
      }
    }

    render() {
        return (
          <Navbar color="indigo" dark expand="md" sticky="top" scrolling>
              <NavbarBrand href="/">
                  <strong>Logo</strong>
              </NavbarBrand>
              { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
              <Collapse isOpen = { this.state.collapse } navbar>
                  <NavbarNav left>
                    <NavItem >
                        <NavLink to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/browse">Browse</NavLink>
                    </NavItem>
                    {this.renderContentDropdown()}
                  </NavbarNav>
                  <NavbarNav right>
                    {this.renderContentRight()}
                  </NavbarNav>
              </Collapse>
          </Navbar>
        );
    }
}

function mapStateToProps({ auth }) {
  return { auth }
}
export default connect(mapStateToProps)(Header)
