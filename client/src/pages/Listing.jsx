import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Carousel,
  Form,
  Button,
} from "react-bootstrap";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaBed, FaRegMoneyBillAlt, FaShower } from "react-icons/fa";
import { useSelector } from "react-redux";

const Listing = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState({});
  const [message, setMessage] = useState("");
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [contactButtonClicked, setContactButtonClicked] = useState(false);
  const user = useSelector((state) => state.user.currentUser.user);
  const [landLord, setLandLord] = useState(null);

  console.log("====================================");
  console.log(landLord);
  console.log("====================================");
  useEffect(() => {
    const fetchListing = async () => {
      setError(false);
      try {
        const response = await axios.get(`/listing/get/${id}`);
        const data = response.data;
        if (response.status !== 200) {
          setError(data.message);
        }
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  useEffect(() => {
    const fetchLandlord = async () => {
      const response = await axios.get(`/user/${listing.userRef}`);
      const data = response.data;

      setLandLord(data);
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleSendMessage = () => {
    // Logic to send message to landlord
    console.log("Message sent:", message);
    // Reset message input
    setMessage("");
  };

  return (
    <Container>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : listing ? (
        <Row>
          <Col>
            <Card>
              <Carousel>
                {listing.imageUrls.map((imageUrl, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={imageUrl}
                      alt={`Slide ${index}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Body>
                <Card.Title>{listing.name}</Card.Title>
                <Card.Text>{listing.description}</Card.Text>
                <Card.Text>
                  <BsFillHouseDoorFill /> {listing.address}
                </Card.Text>
                <Card.Text>
                  <FaRegMoneyBillAlt /> Price: ${listing.regularPrice}
                </Card.Text>
                {listing.offer && listing.discountPrice && (
                  <Card.Text>
                    <FaRegMoneyBillAlt /> Discounted Price: ${listing.discountedPrice}
                  </Card.Text>
                )}
                <Card.Text>
                  <FaBed /> Bedrooms: {listing.bedrooms}
                </Card.Text>
                <Card.Text>
                  <FaShower /> Bathrooms: {listing.bathrooms}
                </Card.Text>

                {user && listing.userRef !== user._id && (
                  <div>
                    {!showMessageInput && !contactButtonClicked && (
                      <Button
                        className="w-100"
                        onClick={() => {
                          setShowMessageInput(true);
                          setContactButtonClicked(true);
                        }}
                      >
                        Contact Landlord
                      </Button>
                    )}
                  </div>
                )}
                {showMessageInput && (
                  <div className="mt-3">
                    <Card.Text>
                      {landLord
                        ? `Contact ${
                            landLord.username
                          } for ${listing.name.toLowerCase()}`
                        : ""}
                    </Card.Text>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    {landLord && (
                      <Link
                        to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
                        className="mt-2 btn btn-secondary"
                        onClick={handleSendMessage}
                      >
                        Send
                      </Link>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div>No listing found</div>
      )}
    </Container>
  );
};

export default Listing;
