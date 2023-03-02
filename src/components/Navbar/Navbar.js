import { Link, useNavigate } from "react-router-dom";
import torrelLogo from "./../../images/torrelLogo.png";
import classes from "./Navbar.module.css";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // const logout = () => {
  //   // removing user from localStorage
  //   localStorage.removeItem("User");
  //   localStorage.removeItem("clientID");
  //   dispatch({
  //     type: "LOGOUT",
  //   });
  //   setIsMobile(false);
  // };

  return (
    <div className={classes.navbar}>
      <nav className={classes.navbar__nav}>
        {/* *****Navbar__left************ */}
        <div className={classes.nav__logo}>
          <Link to="/">
            <img src={torrelLogo} alt="" />
          </Link>
        </div>

        {/* *****Navbar__Right************ */}
        <div
          className={isMobile ? classes.nav__right_mobile : classes.nav__right}
        >
          <ul>
            <li onClick={() => setIsMobile(false)}>
              <Link to="/">Pricing</Link>
            </li>
            {!user ? (
              <>
                <li onClick={() => setIsMobile(false)}>
                  <Link to="/signup">Signup</Link>
                </li>
                <li onClick={() => setIsMobile(false)}>
                  <Link to="/login">Login</Link>
                </li>
              </>
            ) : (
              <li onClick={logout}>
                <a href="#">Logout</a>
              </li>
            )}
            <li onClick={() => setIsMobile(false)}>
              {/* <Link to="/">Try Now</Link> */}
              <Button onClick={() => navigate("/login")}>Try Now</Button>
            </li>
          </ul>
          <button
            style={isMobile ? { top: "-54px" } : { top: "30px" }}
            className={classes.mobile_menu_btn}
          >
            {isMobile ? (
              <CloseIcon
                style={{ fontSize: "30px" }}
                onClick={() => setIsMobile(false)}
              />
            ) : (
              <MenuIcon
                style={{ fontSize: "30px" }}
                onClick={() => setIsMobile(true)}
              />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
