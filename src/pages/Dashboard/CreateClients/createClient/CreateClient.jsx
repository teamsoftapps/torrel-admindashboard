// import { Button } from "@mui/material";
import React, { useState } from "react";
import classes from "./CreateClient.module.css";
// import saveImg from "../../../../images/save.png";
import imageIcon from "../../../../images/imgUpload.png";
import { useAuthContext } from "../../../../hooks/useAuthContext";
// import { api } from "../../../../services/api";
import { api } from "../../../../services/api";
// import { useInvoiceContext } from "../../../../hooks/useInvoiceContext";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

const CreateClient = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [businessName, setBusinessName] = useState("");
  // const [companyName, setCompanyName] = useState("");
  // const [address, setAddress] = useState("");
  // const [website, setWebsite] = useState("");
  // const [phone, setPhone] = useState("");
  // const [clientEmail, setClientEmail] = useState("");

  const [createClient, setCreateClient] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    companyName: "",
    address: "",
    website: "",
    phone: "",
    clientEmail: "",
  });
  // console.log("Seletected File>>>>>", selectedFile);
  // console.log("user>>>>", user.data._id);

  const handleFile = (e) => {
    const file = e.target.files[0];
    console.log("file", file);

    const imgType = ["image/png", "img/jpg", "img/jpeg"];

    if (!file) {
      alert("Please select a File to upload!");
      return;
    }
    if (!imgType.includes(file.type)) {
      alert("Please select a file of type png, jpg or jpeg");
      return;
    }
    if (file.size > 1000000) {
      alert("File size is too large!");
      return;
    }
    // setSelectedFile(file);
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
    } else {
      setSelectedFile("");
    }
  };

  // const postData = async (payload) => {

  //   try {
  //     const { data } = await api.post("/api/v1/clients", payload);
  //     if (data) {
  //       setError(null);
  //       setIsLoading(false);
  //       // dispatch({
  //       //   type: "CREATE__CLIENTS",
  //       //   payload: data,
  //       // });
  //       console.log("data>>>>>>>>", data);
  //     }
  //     setIsLoading(false);
  //     setError(null);
  //     console.log("Client Posted Sucessfully!!");
  //   } catch (error) {
  //     setError(error.response.data);
  //     setIsLoading(false);
  //     console.log(error.response.data);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("clientName", clientPost.clientName);
    // formData.append("user", clientPost.user);
    // formData.append("address", clientPost.address);
    // formData.append("description", clientPost.description);
    // formData.append("website", clientPost.website);
    // formData.append("phone", clientPost.phone);
    // formData.append("image", selectedFile);
    // formData.append("clientEmail", clientPost.clientEmail);
    // formData.append("description", clientPost.description);
    // formData.append("paymentDue", clientPost.paymentDue);

    // postData(formData);
    // const payload = {
    //   firstName,
    //   lastName,
    //   businessName,
    //   companyName,
    //   address,
    //   website,
    //   phone,
    //   clientEmail,
    //   user: user.data._id,
    //   image: selectedFile,
    // };

    // console.log("client Data>>>>", payload);
    // if (payload) {
    //   postData(payload);
    // }

    const payload = {
      ...createClient,
      // user: user.data._id,
      image: selectedFile,
    };
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/api/v1/clients", payload, {
        headers: { Authorization: `Bearer ${user?.data?.token}` },
      });
      if (data) {
        setIsLoading(false);
        setError(null);
        console.log("Client data>>>>>>", data);
        showToastMessage("Client Created Successfully!");
      }

      resetForm();
      // if (data.message === "success") {
      //   showToastMessage("Client Created Successfully !");
      // }

      setTimeout(() => {
        navigate("/dashboard/clients");
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      console.log("error>>>>>", error.response.data);
      setError(error.response.data.message);
    }
  };

  const resetForm = () => {
    setSelectedFile("");
    setCreateClient({
      firstName: "",
      lastName: "",
      businessName: "",
      companyName: "",
      address: "",
      website: "",
      phone: "",
      clientEmail: "",
    });
    // setFirstName("");
    // setLastName("");
    // setBusinessName("");
    // setCompanyName("");
    // setAddress("");
    // setWebsite("");
    // setPhone("");
    // setClientEmail("");
    // setSelectedFile("");
  };

  // FUNCTION FOR TOAST MESSAGE
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-success-message",
    });
  };

  return (
    <div className={classes.container}>
      {/* {/ TOP /} */}
      <div className={classes.top}>
        <h1>Add New Clients</h1>
        {/* <Button>
          <img src={saveImg} alt="" />
          Save
        </Button> */}
      </div>

      {/* {/ create client form /} */}
      <div className={classes.form__container}>
        <form className={classes.form__control} onSubmit={handleSubmit}>
          <div className={classes.uploadImage}>
            <span style={{ fontSize: "13px", marginBottom: "10px" }}>
              Upload Image
            </span>
            <div className={classes.client__image}>
              <div className={classes.imageInput}>
                <img src={imageIcon} alt="" />
                <span className={classes.signatureSpan}>Client Image</span>
                <span className={classes.sizeSpan}>
                  Recommend Size (1920 x 1080) example
                </span>
                <label for="inputTag">
                  <span style={{ cursor: "pointer" }}>Browse</span>
                  <input
                    id="inputTag"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleFile(e)}
                  />
                </label>
              </div>
              <div className={classes.imgPreview}>
                {selectedFile ? (
                  <img src={selectedFile} alt="" className={classes.image} />
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </div>
          </div>

          <div className={classes.inputContainer}>
            <label>
              <span>First Name</span>
              <input
                type="text"
                placeholder="First Name"
                value={createClient.firstName}
                onChange={(e) =>
                  setCreateClient({
                    ...createClient,
                    firstName: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <span>Last Name</span>
              <input
                type="text"
                placeholder="Last Name"
                value={createClient.lastName}
                onChange={(e) =>
                  setCreateClient({ ...createClient, lastName: e.target.value })
                }
              />
            </label>
          </div>

          <div className={classes.inputContainer}>
            <label>
              <span>Business Name</span>
              <input
                type="text"
                placeholder="Business Name"
                value={createClient.businessName}
                onChange={(e) =>
                  setCreateClient({
                    ...createClient,
                    businessName: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <span>Company Name</span>
              <input
                type="text"
                placeholder="Company Name"
                value={createClient.companyName}
                onChange={(e) =>
                  setCreateClient({
                    ...createClient,
                    companyName: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className={classes.inputContainer}>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="Your Email"
                value={createClient.clientEmail}
                onChange={(e) =>
                  setCreateClient({
                    ...createClient,
                    clientEmail: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <span>Phone</span>
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={createClient.phone}
                onChange={(e) =>
                  setCreateClient({ ...createClient, phone: e.target.value })
                }
              />
            </label>
          </div>
          <div className={classes.inputContainer}>
            <label>
              <span>Website</span>
              <input
                type="text"
                placeholder="Enter Website"
                value={createClient.website}
                onChange={(e) =>
                  setCreateClient({ ...createClient, website: e.target.value })
                }
              />
            </label>
            <label>
              <span>Address</span>
              <input
                type="text"
                placeholder="Client Address"
                value={createClient.address}
                onChange={(e) =>
                  setCreateClient({ ...createClient, address: e.target.value })
                }
              />
            </label>
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "0.8rem", margin: "20px 0" }}>
              {error}
            </p>
          )}

          {isLoading ? (
            <button style={{ opacity: "0.6" }} disabled>
              Creating...
            </button>
          ) : (
            <button type="submit">Create</button>
          )}
          {/* <Button type="submit">Create</Button> */}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateClient;
