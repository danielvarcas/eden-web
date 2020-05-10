import React from 'react';
import { Link } from '@reach/router';
import { Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

function SiteNavbar(props) {
  const { navLinks } = props;
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand href="#home" as={Link} to="/home">
        <span className="gm_banner_text">Eden</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {navLinks.length > 0 &&
            navLinks.map(navLink => (
              <Nav.Link as={Link} to={navLink.href} key={navLink.key}>
                {navLink.text}
              </Nav.Link>
            ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

SiteNavbar.propTypes = {
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

SiteNavbar.defaultProps = {
  navLinks: [],
};

export default SiteNavbar;
