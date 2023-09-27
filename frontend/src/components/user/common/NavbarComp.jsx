import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../store/category/Action";
import { Link } from "react-router-dom";
const NavbarComp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const categoryData = useSelector((state) => state.category.category);
  console.log(categoryData);
  return (
    <>
      <Navbar expand="lg" className="navbar-section" sticky="top">
        <Container>
          <Link to="/" className="navbarBrand">
            Fantom Blog
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/" className="navbarBrand">
                Home
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
