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
  SignOutUserStart,
  SignOutUserSuccess,
  UpdateUserStart,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingError, setShowListingError] = useState(false);
  const [userListingData, setUserListingData] = useState(null);
  const dispatch = useDispatch();

  console.log(currentUser.user.avatar);
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
        `/user/update/${currentUser.user._id}`,
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

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await axios.delete(
        `/user/delete/${currentUser.user._id}`
      );
      const data = response.data;
      if (response.status === 200) {
        dispatch(deleteUserSuccess());
        toast.success("Profile Deleted Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(SignOutUserStart());
      const response = await axios.post("/auth/signout");
      const data = response.data;
      if (response.status === 200) {
        toast.success(data.message);
        dispatch(SignOutUserSuccess());
      } else {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const response = await axios.get(`/user/listing/${currentUser.user._id}`);

      const data = response.data;
      console.log(data);
      if (response.status !== 200) {
        setShowListingError(data.message);
        return;
      }

      setUserListingData(data);
    } catch (error) {
      setShowListingError("Error showing the list");
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const response = await axios.delete(`/listing/delete/${listingId}`);
      const data = response.data;
      if (response.status === 200) {
        console.log(data.message);
        setUserListingData((prev) => {
          prev.filter((listing) => listing._id !== listingId);
        });
        toast.success("Listing Deleted Successfully");
      }
    } catch (error) {
      console.log(error.message);
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
              src={formData.avatar || currentUser.user.avatar}
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
                defaultValue={currentUser.user.username}
                name="username"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue={currentUser.user.email}
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
                {loading ? "Loading..." : "Update"}
              </Button>
            </div>
          </Form>
          <br />
          <div className="d-grid">
            <Button variant="success" type="submit" href="/createlisting">
              Create Listing
            </Button>
          </div>
          <div className="d-grid mt-3">
            <Button variant="danger" onClick={handleDelete}>
              Delete Account
            </Button>
          </div>
          <div className="d-grid mt-3">
            <Button variant="secondary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <div className="d-flex justify-content-lg-between">
            <Button
              type="button"
              onClick={handleShowListing}
              className="text-decoration-none text-light"
            >
              Show Listing
            </Button>
            {showListingError && (
              <p className="text-danger">{showListingError}</p>
            )}
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          {userListingData && userListingData.length > 0 && (
            <div>
              {userListingData.map((listing, index) => (
                <div key={index} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={listing.imageUrls[0]}
                        className="img-fluid rounded-start"
                        alt="listing"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="card-title">{listing.name}</h5>
                        </div>
                        <div className="d-flex flex-column gap-2">
                          <Button
                            variant="danger"
                            className="me-2"
                            onClick={() => handleDeleteListing(listing._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="info"
                            // onClick={() => handleEditListing(listing._id)}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
