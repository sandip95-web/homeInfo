import { BiHome, BiInfoCircle, BiLogIn } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParamFromUrl = urlParams.get("searchTerm");
    if (searchParamFromUrl) {
      setSearchTerm(searchParamFromUrl);
    }
  }, [location.search]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/" className="text-dark fw-bold">
          <BiHome className="me-1 display-4" /> HomeInfo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form onSubmit={handleSubmit} className="d-flex mx-auto w-50">
            <Form.Control
              type="search"
              value={searchTerm}
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-dark">
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

            {currentUser && currentUser.user.avatar ? (
              <Nav.Link href="/profile" className="text-dark">
                <img
                  src={currentUser.user.avatar}
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
