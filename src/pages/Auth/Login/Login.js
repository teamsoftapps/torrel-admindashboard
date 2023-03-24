import { useState } from "react";
import { Link } from "react-router-dom";
import AuthHeading from "../../../components/AuthHeading/AuthHeading";
import Form from "./../../../components/Form/Form";
import classes from "./Login.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { api } from "../../../services/api";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  // const [user, setUser] = useState([]);
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [newError, setNewError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  // console.log("FRONTEND__ENV>>>>>", process.env.REACT_APP_BACKEND_BASE_URL);
  // "http://localhost:5000/api/v1/users/login"

  // console.log("FRONTEND__ENV>>>>>", api);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: userData.email,
      password: userData.password,
    };

    setIsLoading(true);
    setIsError(null);
    setTimeout(() => {
      setNewError(null);
    }, 4000);

    try {
      const { data } = await api.post("/api/v1/users/login", payload);
      if (data && data?.data?.email !== "invoiceapp0@gmail.com") {
        setIsLoading(false);
        setNewError("Only Admin have a access to login here.");
        return;
      } else {
        console.log(data);
        localStorage.setItem("User", JSON.stringify(data));
        // setUser(data);
        dispatch({
          type: "LOGIN",
          payload: data,
        });
        setUserData({ ...userData, email: "", password: "" });
        setSuccessMessage(data.message);
        setIsLoading(false);
        setIsError(null);
        setNewError(null);

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      setIsError(error.response.data);
      setIsLoading(false);
      console.log(error.response.data);
    }
  };

  // console.log("user>>>>", user);
  console.log("error>>>>", isError);

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginInner}>
        <Form>
          <AuthHeading
            headingTitle="Admin Login"
            headingText="See your growth finance here and let see your profit you get now"
          />
          <form className={classes.formGroup} onSubmit={handleSubmit}>
            {/* <label>
              <span>Full Name</span>
              <input type="text" placeholder="Full Name..." />
            </label> */}
            {successMessage && (
              <div className={classes.success}>{successMessage}</div>
            )}

            <label>
              <span>Email Address</span>
              <input
                type="email"
                placeholder="Email..."
                autoComplete="off"
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
                  autoComplete="off"
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

            <div className={classes.checkbox2}>
              <div className={classes.check}>
                <input type="checkbox" />
                <span>Accept all applicable terms and conditions </span>
              </div>
              <Link to="/forgotpassword">Forgot Password</Link>
            </div>

            {isLoading ? (
              <button styles={{ opacity: "0.8" }} disabled={isLoading}>
                Loading...
              </button>
            ) : (
              <button>Login</button>
            )}
            {isError && <div className={classes.error}>{isError?.error}</div>}
            {newError && <div className={classes.error}>{newError}</div>}
          </form>
          {/* <center className={classes.registerTag}>
            Not registered yet? <Link to="/signup">Register here</Link>
          </center> */}
        </Form>
      </div>
    </div>
  );
};

export default Login;
