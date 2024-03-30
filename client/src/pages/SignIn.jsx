import { Link, useNavigate } from "react-router-dom";
import { MdOutlineHomeWork } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  singInStart,
  singInSuccess,
} from "../redux/user/userSlice";
import OAUth from "../components/OAUth";
const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(singInStart());
    try {
      const response = await axios.post("/auth/signin", formData);
      const data = response.data.user;
     console.log('====================================');
     
     console.log('====================================');
      if (response.status === 200) {
        dispatch(singInSuccess(data));
        toast.success("Welcome!");
        navigate("/");
      } else {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
      }
    } catch (err) {
      dispatch(signInFailure(err.response.data.message));
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <section className="vh-2  00 ">
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
                  <MdOutlineHomeWork className="display-2 me-2" />

                  <span className="h1 fw-bold mb-0">Welcome</span>
                </div>
                <h5
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: 1 }}
                >
                  Sign into your account
                </h5>

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
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg btn-block"
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>
                <br />
                <br />
                <OAUth />
                <div className="text-center text-lg-start mt-4 pt-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don&apos;t have an account?
                    <Link to="/signup" className="link-danger mx-2">
                      Sign-Up
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

export default SignIn;
