import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Spinner, Carousel } from 'react-bootstrap';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { FaBed, FaRegMoneyBillAlt, FaShower } from 'react-icons/fa';

const Listing = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState({});

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
      ) : (
        listing ? (
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
                  <Card.Text><FaRegMoneyBillAlt /> Price: ${listing.regularPrice}</Card.Text>
                  <Card.Text><FaBed /> Bedrooms: {listing.bedrooms}</Card.Text>
                  <Card.Text><FaShower/> Bathrooms: {listing.bathrooms}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <div>No listing found</div>
        )
      )}
    </Container>
  );
};

export default Listing;
