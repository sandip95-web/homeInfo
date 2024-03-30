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
import { useSelector } from "react-redux";

function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log("====================================");
  console.log(currentUser);
  console.log("====================================");

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/" className="text-dark fw-bold">
          <BiHome className="me-1 display-4" /> HomeInfo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex mx-auto w-50">
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
          <Nav
            className="mx-auto my-2 my-lg-0 d-flex justify-content-center align-items-center"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/" className="text-dark">
              <BiHome className="me-1" /> Home
            </Nav.Link>
            <Nav.Link href="/about" className="text-dark">
              <BiInfoCircle className="me-1" /> About
            </Nav.Link>

            {currentUser && currentUser.avatar ? (
              <Nav.Link href="/profile" className="text-dark">
                <img
                  src={currentUser.avatar}
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                  alt="profile"
                />
              </Nav.Link>
            ) : (
              <Nav.Link href="/signin" className="text-dark">
                <BiLogIn className="me-1" /> Sign-In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
