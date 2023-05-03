import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useState } from "react";
import classes from "./UserSetting.module.css";

const UserSetting = () => {
  const { user } = useAuthContext();
  const [password, setPassword] = useState("*********");
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState("");
  return (
    <>
      <h1
        style={{
          color: "#603dbf",
          textDecoration: "underline",
        }}
      >
        Account Details
      </h1>
      <div className={classes.form__container}>
        <form className={classes.form__control}>
          <div className={classes.uploadImage}>
            <div className={classes.client__image}>
              <img
                src={user?.data?.userImage}
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />

              {/* <Link to="/dashboard/createbusiness">
              <button className={classes.btn}>Create Business</button>
            </Link> */}
            </div>
            {/* <label htmlFor="inputTag">
            <span style={{ margin: "0" }} className={classes.imgStyle}>
              Browse
            </span>
            <input
              id="inputTag"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleFile(e)}
            />
          </label> */}
          </div>

          <div className={classes.inputContainer}>
            <label>
              <span>First Name</span>
              <input
                //   className={styles.businessInputs}
                type="text"
                placeholder="First Name"
                disabled
                value={user?.data?.firstName}
              />
            </label>
            <label>
              <span>Last Name</span>
              <input
                type="text"
                //   className={styles.businessInputs}
                placeholder="Last Name"
                disabled
                value={user?.data?.lastName}
              />
            </label>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.fullWidth}>
              <span>Email</span>
              <input
                type="email"
                //   className={styles.businessInputs}
                placeholder="Your Email"
                disabled
                value={user?.data?.email}
              />
            </label>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.fullWidth}>
              <span>Password</span>
              <input
                type="email"
                //   className={styles.businessInputs}
                placeholder="Your Email"
                disabled
                value={password}
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className={classes.btn}
              onClick={() =>
                navigate("/dashboard/updateusers", {
                  // state: { id: user?.data?._id },
                  state: { userData: user?.data },
                })
              }
            >
              Update
            </button>
            <Link to={".."}>
              <button
                // onClick={navigate(-1)}
                style={{ marginLeft: "20px" }}
                className={classes.btn}
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserSetting;
