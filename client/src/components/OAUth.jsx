import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { app } from "../utils/firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { singInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAUth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      const data = res.data;
      dispatch(singInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Could not Sign in With google Account: ", error);
    }
  };
  return (
    <>
      <a
        className="btn btn-primary btn-lg btn-block"
        style={{ backgroundColor: "#55acee" }}
        onClick={handleGoogleClick}
        href="#!"
        role="button"
      >
        <FcGoogle className="me-2" />
        Continue with Google
      </a>
    </>
  );
};

export default OAUth;
