import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./UpdateClient.module.css";
import saveImg from "../../../../images/save.png";
import imageIcon from "../../../../images/imgUpload.png";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { api } from "../../../../services/api";
import { useInvoiceContext } from "../../../../hooks/useInvoiceContext";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
// import axios from "axios";

const UpdateClient = () => {
  const location = useLocation();
  const { client } = location.state;

  const [selectedFile, setSelectedFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [updateClient, setUpdateClient] = useState({
    firstName: client?.firstName,
    lastName: client?.lastName,
    businessName: client?.businessName,
    companyName: client?.companyName,
    address: client?.address,
    website: client?.website,
    phone: client?.phone,
    clientEmail: client?.clientEmail,
  });
  // const [clientPost, setClientPost] = useState({
  //   clientName: "",
  //   user: user.data._id,
  //   address: "",
  //   website: "",
  //   phone: null,
  //   clientEmail: "",
  //   description: "",
  //   paymentDue: null,
  // });
  // const { dispatch } = useInvoiceContext();
  // const [clientName, setClientName] = useState(client?.clientName);
  // const [address, setAddress] = useState(client?.address);
  // const [website, setWebsite] = useState(client?.website);
  // const [phone, setPhone] = useState(client?.phone);
  // const [clientEmail, setClientEmail] = useState(client?.clientEmail);
  // const [description, setDescription] = useState(client?.description);
  // const [paymentDue, setPaymentDue] = useState(client?.paymentDue);
  console.log("client-update==>", client);

  console.log("Seletected File>>>>>", selectedFile);

  const handleFile = (e) => {
    const file = e.target.files[0];

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    // const payload = {
    //   clientName: clientName,
    //   user: user.data._id,
    //   address: address,
    //   website: website,
    //   phone: phone,
    //   image: selectedFile,
    //   clientEmail: clientEmail,
    //   description: description,
    //   paymentDue: paymentDue,
    // };

    const payload = {
      ...updateClient,
      user: user.data._id,
      image: selectedFile,
    };
    // console.log("client Data>>>>", payload);
    // if (payload) {
    //   postData(payload);
    // }
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.patch(
        `/api/v1/clients/${client?._id}`,
        payload
      );
      if (data) {
        console.log("Client data>>>>>>", data);
      }

      setIsLoading(false);
      setError(null);
      resetForm();
      if (data.message === "success") {
        showToastMessage();
      }

      setTimeout(() => {
        navigate("/dashboard/clients");
      }, 6000);
    } catch (error) {
      console.log("error>>>>>", error);
      setError(error.response.data);
    }
  };

  const resetForm = () => {
    setUpdateClient({
      firstName: "",
      lastName: "",
      businessName: "",
      companyName: "",
      address: "",
      website: "",
      phone: "",
      clientEmail: "",
    });
  };

  // FUNCTION FOR TOAST MESSAGE
  const showToastMessage = () => {
    toast.success("Client Created Successfully !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-success-message",
    });
  };

  return (
    <div className={classes.container}>
      {/* {/ TOP /} */}
      <div className={classes.top}>
        <h1>Update Client</h1>
        {/* <Button>
          <img src={saveImg} alt="" />
          Save
        </Button> */}
      </div>

      {/* {/ create client form /} */}
      <div className={classes.form__container}>
        <form className={classes.form__control} onSubmit={handleUpdate}>
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
                value={updateClient.firstName}
                onChange={(e) =>
                  setUpdateClient({
                    ...updateClient,
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
                value={updateClient.lastName}
                onChange={(e) =>
                  setUpdateClient({ ...updateClient, lastName: e.target.value })
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
                value={updateClient.businessName}
                onChange={(e) =>
                  setUpdateClient({
                    ...updateClient,
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
                value={updateClient.companyName}
                onChange={(e) =>
                  setUpdateClient({
                    ...updateClient,
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
                value={updateClient.clientEmail}
                onChange={(e) =>
                  setUpdateClient({
                    ...updateClient,
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
                value={updateClient.phone}
                onChange={(e) =>
                  setUpdateClient({ ...updateClient, phone: e.target.value })
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
                value={updateClient.website}
                onChange={(e) =>
                  setUpdateClient({ ...updateClient, website: e.target.value })
                }
              />
            </label>
            <label>
              <span>Address</span>
              <input
                type="text"
                placeholder="Client Address"
                value={updateClient.address}
                onChange={(e) =>
                  setUpdateClient({ ...updateClient, address: e.target.value })
                }
              />
            </label>
          </div>

          {isLoading ? (
            <button style={{ opacity: "0.6" }} disabled>
              Updating...
            </button>
          ) : (
            <button type="submit">Update</button>
          )}
          {/* <Button type="submit">Create</Button> */}
          {/* {error && <div>{error}</div>} */}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateClient;
