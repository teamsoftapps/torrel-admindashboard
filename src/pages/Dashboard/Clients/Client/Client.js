import React, { useEffect, useState } from "react";
import styles from "./Client.module.css";
// import hamburger from "../../../../images/hamburger.png";
// import dashboardIcon from "../../../../images/dashboardIcon.png";
// import threeDots from "../../../../images/threeDots.png";
// import profile from "../../../../images/profile.png";
import phone from "../../../../images/phone.png";
import email from "../../../../images/email.png";
import date from "../../../../images/date.png";
import countryLogo2 from "../../../../images/countryLogo2.png";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useInvoiceContext } from "../../../../hooks/useInvoiceContext";
import { api } from "../../../../services/api";
import { useAuthContext } from "../../../../hooks/useAuthContext";
// import { useAuthContext } from "../../../../hooks/useAuthContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useFetch } from "../../../../hooks/useFetch";
import { useParams } from "react-router-dom";

const Client = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [url, setUrl] = useState(``);
  // const [modal, setModal] = useState(false);
  // const { data: deletedData } = useFetch(url, "DELETE");
  // const clienturl = `/api/v1/clients`;
  // const { data: newClients, isLoading, error } = useFetch(clienturl, "GET");
  // const { user } = useAuthContext();
  const { dispatch, allClients } = useInvoiceContext();
  // const navigate = useNavigate();

  console.log("usersSpecific_clients_from_custom_fetch_hook>>>>", allClients);

  const fetchClients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/v1/superadmin/users/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        console.log("all_clients_from_getApi", data);
        dispatch({
          type: "GET_ALL_CLIENTS",
          payload: data?.data,
        });
      }
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [dispatch]);

  // const handleShowPopup = (id) => {
  //   const newClients = allClients.map((client) => {
  //     if (client._id === id) {
  //       return { ...client, isSelected: !client.isSelected };
  //     } else {
  //       return client;
  //     }
  //   });
  //   dispatch({
  //     type: "GET_ALL_CLIENTS",
  //     payload: newClients,
  //   });
  // };

  // const handleDelete = async (id) => {
  //   console.log("Clients__Deleted__id>>>>", id);
  //   setUrl(`/api/v1/clients/${id}`);

  //   if (deletedData) {
  //     dispatch({
  //       type: "DELETE__CLIENTS",
  //       payload: id,
  //     });
  //     console.log("Client_Deleted_Data>>>", deletedData);
  //     showToastMessage("Client Deleted Sucessfully.");
  //   }

  //   localStorage.removeItem("client_id");
  //   localStorage.removeItem("job_id");
  // };

  // FUNCTION FOR TOAST MESSAGE
  // const showToastMessage = (message) => {
  //   toast.success(message, {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // };

  // const handleClient = (client_id) => {
  //   localStorage.setItem("client_id", client_id);
  //   navigate(`/dashboard/clients/${client_id}`);
  // };

  // const CancelDelete = (id) => {
  //   const newClients = allClients.map((client) => {
  //     if (client._id === id) {
  //       return { ...client, isSelected: !client.isSelected };
  //     } else {
  //       return client;
  //     }
  //   });
  //   dispatch({
  //     type: "GET_ALL_CLIENTS",
  //     payload: newClients,
  //   });
  // };

  return (
    <div className={styles.container}>
      {/* *************TOP HEADER***********  */}
      <div className={styles.top}>
        <h1>Clients</h1>
        {/* <div className={styles.icon}>
          <div>
            <Button onClick={() => navigate("/dashboard/createClients")}>
              + Add Client
            </Button>
          </div>
          <div>
            <img src={hamburger} alt="" />
          </div>
          <div>
            <img src={dashboardIcon} alt="" />
          </div>
        </div> */}
      </div>
      {/* *************CARDS***********  */}
      <div className={styles.cardContainer}>
        {/* *************CARDS 1***********  */}
        {isLoading && <h1 className={styles.isLoading}>Loading...</h1>}
        {error && <div className={styles.error}>{error?.message}</div>}
        {!isLoading && allClients?.length === 0 && (
          <p
            styles={{
              color: "#ffffff",
            }}
          >
            No Clients corresponding to this user.
          </p>
        )}
        {allClients?.map((clients) => {
          return (
            <>
              {/* {modal && (
                <div className={styles.overlay}>
                  <div className={styles.deleteModal}>
                    <div className={styles.modalContant}>
                      <p>Are you sure you want to Delete this Client?</p>
                      <p>
                        <span>Note:</span> Deleting this Client will delete all
                        the data related to this Client
                      </p>
                    </div>
                    <div className={styles.modalBtnConatiner}>
                      <button
                        className={styles.modalBtn}
                        onClick={() => handleDelete(clients?._id)}
                      >
                        Yes
                      </button>
                      <button
                        className={styles.modalBtn}
                        onClick={() => CancelDelete(clients?._id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )} */}
              <div className={styles.card} key={clients._id}>
                <div className={styles.profile}>
                  <div>
                    <img src={clients?.image?.url} alt="" />
                    <div className={styles.clientName}>
                      <span>{clients.firstName + " " + clients.lastName}</span>
                      <span>{clients.companyName}</span>
                    </div>
                  </div>
                  {/* <img
                    src={threeDots}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShowPopup(clients._id)}
                  /> */}
                </div>

                <div className={styles.paymentAndDate}>
                  <div className={styles.left}>
                    <span>Contact</span>
                    <div className={styles.phone}>
                      <img src={phone} alt="" />
                      <span>+{clients.phone}</span>
                    </div>
                    <div className={styles.phone}>
                      <img src={email} alt="" />
                      <span>{clients.clientEmail}</span>
                    </div>
                  </div>

                  <div className={styles.right}>
                    <span>Business Name</span>
                    <div className={styles.phone}>
                      <img src={date} alt="" />
                      <span>{clients.businessName}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.time}>
                  <img src={countryLogo2} alt="" />
                  <span>Local time 7:48 AM</span>
                </div>

                {/* {clients.isSelected && (
                  <div className={styles.popup}>
                    <div onClick={() => handleClient(clients._id)}>
                      view details
                    </div>

                    <div onClick={() => setModal(true)}>Delete</div>
                    <div>
                      <Link
                        to="/dashboard/updateClients"
                        style={{ textDecoration: "none" }}
                        state={{ client: clients }}
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                )} */}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Client;
