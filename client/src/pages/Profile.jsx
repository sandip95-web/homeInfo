import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
import {
  UpdateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(UpdateUserStart());
    try {
      const response = await axios.patch(
        `/user/update/${currentUser._id}`,
        formData
      );
      const data = response.data;
      if (response.status === 200) {
        dispatch(updateUserSuccess(data));
        toast.success("Profile Updated Successfully");
      } else {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(updateUserFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
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
          <Form className="px-4 py-3 border rounded" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentUser.username}
                name="username"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handleChange}
                name="password"
                placeholder="Password"
              />
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
