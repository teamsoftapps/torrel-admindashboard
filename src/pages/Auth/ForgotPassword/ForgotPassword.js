import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthHeading from "../../../components/AuthHeading/AuthHeading";
import Form from "../../../components/Form/Form";
import classes from "./ForgotPassword.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { api } from "../../../services/api";
// import axios from "axios";

const ForgotPassword = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  // const [user, setUser] = useState([]);
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [forgotUser, setForgotUser] = useState();
  const navigate = useNavigate();

  // console.log("FRONTEND__ENV>>>>>", process.env.REACT_APP_BACKEND_BASE_URL);
  // "http://localhost:5000/api/v1/users/login"

  // console.log("FRONTEND__ENV>>>>>", api);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);

    const payload = {
      email: userData.email,
    };

    try {
      const { data } = await api.post("/api/v1/users/forget-password", payload);
      if (data) {
        console.log(data);
        setUserData({ ...userData, email: "" });
        setSuccessMessage(data.message);
        localStorage.setItem("forgot-user", JSON.stringify(data.user));
        console.log("data-user", data.user);
      }
      setIsLoading(false);
      setIsError(null);

      setTimeout(() => {
        setSuccessMessage("");
        // navigate("/resetpassword");
      }, 3000);
    } catch (error) {
      setIsError(error?.response?.data?.message);
      setIsLoading(false);
      console.log(error?.response?.data?.message);
    }
  };

  // console.log("user>>>>", user);
  console.log("error>>>>", isError);

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginInner}>
        <Form>
          <AuthHeading
            headingTitle="Forgot Password"
            headingText="Lost your password? Please enter your email address. You will receive a link to create a new password via email."
          />
          <form className={classes.formGroup} onSubmit={handleSubmit}>
            {/* <label>
              <span>Full Name</span>
              <input type="text" placeholder="Full Name..." />
            </label> */}
            {successMessage && (
              <div className={classes.success}>{successMessage}</div>
            )}

            {isError && <div className={classes.errorMessage}>{isError}</div>}

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

            {isLoading ? (
              <button styles={{ opacity: "0.8" }} disabled={isLoading}>
                Loading...
              </button>
            ) : (
              <button>Send Email</button>
            )}
            {isError && <div className={classes.error}>{isError?.error}</div>}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
