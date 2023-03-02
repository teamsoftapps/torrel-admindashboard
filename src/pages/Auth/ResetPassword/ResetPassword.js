import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthHeading from "../../../components/AuthHeading/AuthHeading";
import Form from "../../../components/Form/Form";
import classes from "./ResetPassword.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { api } from "../../../services/api";
// import axios from "axios";

const ResetPassword = () => {
  const forgotUser = JSON.parse(localStorage.getItem("forgot-user"));

  const [userData, setUserData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  // const [user, setUser] = useState([]);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const navigate = useNavigate();

  console.log("user", user);

  // console.log("FRONTEND__ENV>>>>>", process.env.REACT_APP_BACKEND_BASE_URL);
  // "http://localhost:5000/api/v1/users/login"

  // console.log("FRONTEND__ENV>>>>>", api);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);

    const payload = {
      password: userData.newPassword,
      password2: userData.confirmPassword,
    };

    try {
      const { data } = await api.patch(
        `/api/v1/users/reset-password/${forgotUser._id}`,
        payload
      );
      if (data) {
        console.log(data);
        setUserData({ ...userData, email: "" });
        setSuccessMessage(data.message);
      }
      setIsLoading(false);
      setIsError(null);

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login");
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
            headingTitle="Reset Password"
            headingText="Please Enter a New Password"
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
              <span>New Password</span>
              <div className={classes.show__password}>
                <input
                  type={showPassword1 ? "password" : "text"}
                  placeholder="Password..."
                  value={userData.newPassword}
                  onChange={(e) =>
                    setUserData({ ...userData, newPassword: e.target.value })
                  }
                />
                {showPassword1 ? (
                  <VisibilityOffIcon
                    color="#ffffff"
                    className={classes.passwordIcon}
                    onClick={() => setShowPassword1(false)}
                  />
                ) : (
                  <VisibilityIcon
                    color="#ffffff"
                    className={classes.passwordIcon}
                    onClick={() => setShowPassword1(true)}
                  />
                )}
              </div>
            </label>

            <label>
              <span>Confirm Password</span>
              <div className={classes.show__password}>
                <input
                  type={showPassword2 ? "password" : "text"}
                  placeholder="Password..."
                  value={userData.confirmPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {showPassword2 ? (
                  <VisibilityOffIcon
                    color="#ffffff"
                    className={classes.passwordIcon}
                    onClick={() => setShowPassword2(false)}
                  />
                ) : (
                  <VisibilityIcon
                    color="#ffffff"
                    className={classes.passwordIcon}
                    onClick={() => setShowPassword2(true)}
                  />
                )}
              </div>
            </label>

            {isLoading ? (
              <button styles={{ opacity: "0.8" }} disabled={isLoading}>
                Loading...
              </button>
            ) : (
              <button>Reset Password</button>
            )}
            {isError && <div className={classes.error}>{isError?.error}</div>}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
