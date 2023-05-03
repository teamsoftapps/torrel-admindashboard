import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import classes from "./TermsAndConditions.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import torrelLogo from "../../../images/torrelLogo.png";
import backIcon from "../../../images/arrowBack.png";

function TermsAndConditions() {
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div className={classes.main}>
      <div className={classes.navbar}>
        <nav className={classes.navbar__nav}>
          <div className={classes.navbar__left}>
            <div className={classes.backIcon} onClick={() => navigate(-1)}>
              <img src={backIcon} alt="" />
            </div>
            <div className={classes.nav__logo}>
              <Link to="/">
                <img src={torrelLogo} alt="" />
              </Link>
            </div>
          </div>
          <div>
            {" "}
            <h1>Terms and Conditions</h1>{" "}
          </div>

          <div></div>
        </nav>
      </div>
      <div className={classes.terms}>
        <p>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          animi quam earum deleniti dolorum! Inventore vero perferendis porro
          commodi in veritatis est quia totam facilis repellendus, praesentium
          esse neque voluptatum obcaecati sit?
        </p>
        <p>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          animi quam earum deleniti dolorum! Inventore vero perferendis porro
          commodi in veritatis est quia totam facilis repellendus, praesentium
          esse neque voluptatum obcaecati sit?
        </p>
        <p>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          animi quam earum deleniti dolorum! Inventore vero perferendis porro
          commodi in veritatis est quia totam facilis repellendus, praesentium
          esse neque voluptatum obcaecati sit?
        </p>
        <p>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          animi quam earum deleniti dolorum! Inventore vero perferendis porro
          commodi in veritatis est quia totam facilis repellendus, praesentium
          esse neque voluptatum obcaecati sit?
        </p>
        <p>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          animi quam earum deleniti dolorum! Inventore vero perferendis porro
          commodi in veritatis est quia totam facilis repellendus, praesentium
          esse neque voluptatum obcaecati sit?
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
