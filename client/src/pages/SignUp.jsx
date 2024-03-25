import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/auth/signup", formData);
      const data = response.data;
      if (data.success === false) {
        toast.error(data.message);
      } else {
        toast.success("Sign up successful!");
        // Redirect user or perform any other actions upon successful sign up
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred while signing up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="vh-100 ">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center mb-3 pb-1">
                  <MdOutlineAddHomeWork className="display-2 me-2" />

                  <span className="h1 fw-bold mb-0">Welcome</span>
                </div>
                <h5
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: 1 }}
                >
                  Create a new account
                </h5>
                <div className="form-outline mb-4">
                  <input
                    type="username"
                    id="username"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Username
                  </label>
                </div>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>

                {/* Submit button */}
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  {loading ? "Loading..." : "Sign in"}
                </button>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">OR</p>
                </div>

                <a
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                  role="button"
                >
                  <FcGoogle className="me-2" />
                  Continue with Google
                </a>
                <div className="text-center text-lg-start mt-2 pt-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?
                    <Link to="/signin" className="link-danger mx-2">
                      Sign-In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
