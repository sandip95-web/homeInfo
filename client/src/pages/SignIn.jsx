import { Link } from "react-router-dom";
import { MdOutlineHomeWork } from "react-icons/md";

const SignIn = () => {
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
              <form className="">
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
                    id="form1Example13"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign Up
                </button>

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
