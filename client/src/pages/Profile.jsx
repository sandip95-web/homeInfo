import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2 className="text-center">Profile</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <input
            type="file"
            ref={fileRef}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            hidden
            accept="image/*"
          />
          <div className="text-center">
            <img
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              onClick={() => fileRef.current.click()}
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }}
            />
            <p>
              {fileUploadError ? (
                <div className="alert alert-danger" role="alert">
                  Error Uploading Image (Image must be less than 2 MB)
                </div>
              ) : filePerc > 0 && filePerc < 100 ? (
                <div className="alert alert-info" role="alert">
                  {`Uploading ${filePerc}%`}
                </div>
              ) : filePerc === 100 ? (
                <div className="alert alert-success" role="alert">
                  Uploaded Successfully
                </div>
              ) : (
                ""
              )}
            </p>
          </div>
          <Form className="px-4 py-3 border rounded">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentUser.username}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                defaultValue={currentUser.email}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
          <br />
          <div className="d-grid">
            <Button variant="success" type="submit">
              Create Listing
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <div className="d-flex justify-content-lg-between">
            <a
              href="/delete-account"
              className="me-2 text-decoration-none text-danger"
            >
              Delete Account
            </a>
            <a
              href="/sign-out"
              className="me-2 text-decoration-none text-danger"
            >
              Sign Out
            </a>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <div className="text-center">
            <a
              href="/show-listing"
              className="text-decoration-none text-success"
            >
              Show Listing
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
