import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
const CreateListing = () => {
  const [file, setFile] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: 0,
    discountPrice: 0,
    bedrooms: 0,
    bathrooms: 0,
    furnished: false,
    parking: false,
    type: "",
    offer: false,
    imageUrls: [],
    sell: false, // Newly added field
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSubmit = () => {
    if (file.length > 0 && file.length + formData.imageUrls.length < 7) {
      const promise = [];
      setUploading(true);
      setImageUploadError(false);
      for (let i = 0; i < file.length; i++) {
        promise.push(storeImage(file[i]));
      }

      Promise.all(promise)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image Upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can Only Upload 6 Images per Listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("====================================");
          console.log(`Upload is ${progress}% done`);
          console.log("====================================");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Create A Listing</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="regularPrice">
              <Form.Label>Regular Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter regular price"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="discountPrice">
              <Form.Label>Discount Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter discount price"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="bedrooms">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="bathrooms">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="furnished" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Furnished"
            name="furnished"
            checked={formData.furnished}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="parking" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Parking"
            name="parking"
            checked={formData.parking}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="offer" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Offer"
            name="offer"
            checked={formData.offer}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="sell" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Sell"
            name="sell"
            checked={formData.sell}
            onChange={handleChange}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Col>
            <Form.Group controlId="image">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files)}
                multiple
              />
              <p className="text-danger display-8">
                {imageUploadError && imageUploadError}
              </p>
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="d-flex p-3 my-1 justify-content-between align-items-center border border-2"
                  >
                    <img
                      src={url}
                      alt="listing image"
                      className="w-25 h-25 object-fit-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="btn btn-danger rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Button
                disabled={uploading}
                type="button"
                onClick={handleImageSubmit}
                className="btn btn-success"
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            CREATE LISTING
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateListing;
