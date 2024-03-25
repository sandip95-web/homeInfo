import {
  BiHome,
  BiInfoCircle,
  BiUser,
  BiLogIn,
  BiUserPlus,
} from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/" className="text-dark fw-bold">
          <BiHome className="me-1 display-4" /> HomeInfo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/" className="text-dark">
              <BiHome className="me-1" /> Home
            </Nav.Link>
            <Nav.Link href="/about" className="text-dark">
              <BiInfoCircle className="me-1" /> About
            </Nav.Link>
            <Nav.Link href="/profile" className="text-dark">
              <BiUser className="me-1" /> Profile
            </Nav.Link>
            <Nav.Link href="/signin" className="text-dark">
              <BiLogIn className="me-1" /> Sign-In
            </Nav.Link>
            <Nav.Link href="/signup" className="text-dark">
              <BiUserPlus className="me-1" /> Sign-Up
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark">
              <RiSearchLine />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
