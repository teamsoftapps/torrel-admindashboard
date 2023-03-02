import { useState } from "react";
import AuthHeading from "../../../components/AuthHeading/AuthHeading";
import Form from "./../../../components/Form/Form";
// import twitterIcon from "./../../../images/Vector.png";
// import appleIcon from "./../../../images/Vector1.png";
import googleIcon from "./../../../images/vector2.png";
import classes from "./Signup.module.css";
// import { api } from "../../../services/api";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { api } from "../../../services/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import socialMediaAuth from "../../../firebaseService/auth";
import { GoogleAuthProvider } from "../../../firebaseConfig/authMethods";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const [user, setUser] = useState([]);
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [socialUsers, setSocialUsers] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);

    const payload = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    // console.log("payload", payload);
    try {
      const { data } = await api.post("/api/v1/users/signup", payload);
      console.log("data", data);
      if (data) {
        console.log(data);
        localStorage.setItem("User", JSON.stringify(data));
        // setUser(data);
        dispatch({
          type: "LOGIN",
          payload: data,
        });
        setUserData({ ...userData, name: "", email: "", password: "" });
        setSuccessMessage(data.message);
      }
      setIsLoading(false);
      setIsError(null);

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login");
      }, 3000);
    } catch (error) {
      setIsError(error.response.data);
      setIsLoading(false);
      console.log(error.response.data);
    }
  };

  // LOGIN WITH GOOGLE
  const handleSocialLogin = async (provider) => {
    console.log("Linked_Accounts_provider===>", provider);

    // window.open(href, "_self");

    try {
      const res = await socialMediaAuth(provider);

      if (res) {
        setSocialUsers(res);
        console.log("Google__response>>>>>", res);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.signupContainer}>
      <div className={classes.signupInner}>
        <Form>
          <AuthHeading
            headingTitle="Register Now"
            headingText="See your growth finance here and let see your profit you get now"
          />
          <form className={classes.formGroup} onSubmit={handleSubmit}>
            {successMessage && (
              <div className={classes.success}>{successMessage}</div>
            )}
            <label>
              <span>Full Name</span>
              <input
                type="text"
                placeholder="Full Name..."
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </label>

            <label>
              <span>Email Address</span>
              <input
                type="email"
                placeholder="Email..."
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </label>

            <label>
              <span>Password</span>
              <div className={classes.show__password}>
                <input
                  type={showPassword ? "password" : "text"}
                  placeholder="Password..."
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
                {showPassword ? (
                  <VisibilityOffIcon
                    color="#ffffff"
                    className={classes.passwordIcon}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <VisibilityIcon
                    color="#ffffff"
                    className={classes.passwordIcon}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </label>

            <div className={classes.checkbox}>
              <input type="checkbox" />
              <span>Accept all applicable terms and conditions </span>
            </div>
            {isLoading ? (
              <button styles={{ opacity: "0.8" }} disabled={isLoading}>
                Loading...
              </button>
            ) : (
              <button>Signup</button>
            )}

            {isError && <div className={classes.error}>{isError?.error}</div>}
          </form>

          <div style={{ textAlign: "center", color: "#ffffff" }}>
            or continue with
          </div>
          <div className={classes.socialContainer}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 0",
                cursor: "pointer",
              }}
              onClick={() => handleSocialLogin(GoogleAuthProvider)}
            >
              <img src={googleIcon} alt="" style={{ height: "25px" }} />
              <span style={{ marginLeft: "15px" }}>Continue with Gooogle</span>
            </div>
            {/* <div>
              <img src={appleIcon} alt="" />
            </div>
            <div>
              <img src={twitterIcon} alt="" />
            </div> */}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
