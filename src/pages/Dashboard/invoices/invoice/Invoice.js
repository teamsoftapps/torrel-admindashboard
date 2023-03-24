import React, { useState, useEffect } from "react";
import styles from "./Invoice.module.css";
import totalInvoice from "../../../../images/totalInvoice.png";
import paidInvoice from "../../../../images/paidInvoice.png";
import unpaidInvoice from "../../../../images/unpaidInvoice.png";
import draft from "../../../../images/draft.png";
// import profile from "../../../../images/profile.png";
import threeDots from "../../../../images/threeDots.png";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import { api } from "../../../../services/api";
// import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetch } from "../../../../hooks/useFetch";
import { useInvoiceContext } from "../../../../hooks/useInvoiceContext";
import CurrencyFormatter from "../../../../utils/currencyFormatter";
// import { async } from "q";

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allDataUrl = `/api/v1/invoices/job/${id}`;
  const [url, setUrl] = useState("");

  const {
    data: allInvoicesData,
    isLoading,
    error,
  } = useFetch(allDataUrl, "GET");
  // const { data: paidInvoices } = useFetch(url, "GET");
  // const { data: statusInvoices,apiData } = useFetch(url, "PATCH");
  const { data: deletedData } = useFetch(url, "DELETE");
  // const { data: datedData } = useFetch(url, "GET");

  // const [error, setError] = useState(null);
  // const [loading, setIsLoading] = useState(false);
  // const [allJobs, setAllJobs] = useState([]);
  const [invoiceHeading, setInvoiceHeading] = useState("Invoices");
  // const [invoiceStatus, setInvoicStatus] = useState(false);
  const [activeMonth, setActiveMonth] = useState(false);
  const [activeWeek, setActiveWeek] = useState(false);
  const [active, setActive] = useState(true);
  const [mainInvoiceStatus, setMainInvoiceStatus] = useState(true);
  const { dispatch, allInvoice } = useInvoiceContext();
  // console.log("allInvoice:::", allInvoice);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_INVOICE",
      payload: allInvoicesData?.data,
    });
  }, [dispatch, allInvoicesData]);

  const getData = () => {
    setInvoiceHeading("Invoices");
    if (allInvoicesData) {
      dispatch({
        type: "GET_ALL_INVOICE",
        payload: allInvoicesData?.data,
      });
    }

    //   try {
    //     const { data } = await axios.get(
    //       `http://localhost:5000/api/v1/invoices/job/${id}`
    //     );
    //     console.log("data", data);
    //     if (data) {
    //       setIsLoading(false);
    //       setError(null);
    //       setAllJobs(data.data);
    //     }
    //   } catch (error) {
    //     setIsLoading(false);
    //     setError(error.response.data);
    //     console.log("all jobs error==>", error);
    //   }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const getPaidInvoices = async (status) => {
    try {
      const { data } = await api.get(
        `/api/v1/invoices/job/${id}?status=${status}`
      );
      if (data) {
        console.log("Query__Jobs>>>", data);
        dispatch({
          type: "GET_ALL_INVOICE",
          payload: data?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const { data } = await axios.get(
    //     `http://localhost:5000/api/v1/invoices/job/${id}?status=${status}`
    //   );

    //   if (data) {
    //     setIsLoading(false);
    //     setError(null);
    //     // console.log("all invoices==>", data.data);
    //     setAllJobs(data.data);
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    //   setError(error.response.data);
    //   console.log("all jobs error==>", error);
    // }
  };

  const updateInvoiceStatus = async (status, id, invoiceStatus) => {
    console.log("status", status);
    //   setUrl(`http://localhost:5000/api/v1/invoices/job/${id}?status=${status}`)
    //  console.log("status",status)
    //   apiData(status);
    console.log("invoiceStatus", invoiceStatus);
    try {
      const { data } = await api.patch(`/api/v1/invoices/${id}`, { status });
      console.log("data", data);
      setMainInvoiceStatus(false);
      // if (data) {
      //   console.log("Query__Jobs>>>", data);
      //   dispatch({
      //     type:"UPDATE_INVOICE",
      //     payload:data?.data
      //   })
      // }
    } catch (error) {
      console.log(error);
    }

    // dispatch({
    //   type:"GET_ALL_INVOICE",
    //   payload:statusInvoices?.data
    // })

    // setIsLoading(true);
    // setError(null);
    // try {
    //   const { data } = await axios.patch(
    //     `http://localhost:5000/api/v1/invoices/${id}`,
    //     { status }
    //   );

    //   if (data) {
    //     setIsLoading(false);
    //     setError(null);
    //     // console.log("all invoices==>", data.data);
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    //   setError(error.response.data);
    //   console.log("all jobs error==>", error);
    // }
  };

  const updateInvoiceDate = async (type) => {
    const date = new Date().toJSON().split("T")[0];
    console.log("date", date);

    // setUrl(`http://localhost:5000/api/v1/invoices/job/${id}?date=${date}&type=${type}`);

    // if(datedData){
    //   dispatch({
    //     type:"GET_ALL_INVOICE",
    //     payload:datedData?.data
    //   })

    // }

    try {
      const { data } = await api.get(
        `/api/v1/invoices/job/${id}?date=${date}&type=${type}`
      );
      if (data) {
        console.log("Query__Jobs>>>", data);
        dispatch({
          type: "GET_ALL_INVOICE",
          payload: data?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }

    if (type == "monthly") {
      setActiveMonth(true);
      setActiveWeek(false);
      setActive(false);
    } else if (type == "weekly") {
      setActiveWeek(true);
      setActiveMonth(false);
      setActive(false);
    } else {
      setActiveWeek(false);
      setActiveMonth(false);
      setActive(true);
    }
    // try {
    //   const { data } = await axios.get(
    //     `http://localhost:5000/api/v1/invoices/job/${id}?date=${date}&type=${type}`
    //   );

    //   if (data) {
    //     // console.log("data:::::::", data);
    //     setIsLoading(false);
    //     setError(null);
    //     setAllJobs(data.data);
    //   }
    //   if (type == "monthly") {
    //     setActiveMonth(true);
    //     setActiveWeek(false);
    //     setActive(false);
    //   } else if (type == "weekly") {
    //     setActiveWeek(true);
    //     setActiveMonth(false);
    //     setActive(false);
    //   } else {
    //     setActiveWeek(false);
    //     setActiveMonth(false);
    //     setActive(true);
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    //   setError(error.response.data);
    //   console.log("all jobs error==>", error);
    // }
  };

  const ShowPopup = (id) => {
    console.log("allInvoice", allInvoice);
    const newInvoice = allInvoice.map((invoice) => {
      if (invoice._id === id) {
        return { ...invoice, isStatus: !invoice.isStatus };
      } else {
        return invoice;
      }
    });
    dispatch({
      type: "GET_ALL_INVOICE",
      payload: newInvoice,
    });
    setMainInvoiceStatus(true);
  };

  const handleShowPopup = (id) => {
    const newInvoice = allInvoice.map((invoice) => {
      if (invoice._id === id) {
        return { ...invoice, isSelected: !invoice.isSelected };
      } else {
        return invoice;
      }
    });
    dispatch({
      type: "GET_ALL_INVOICE",
      payload: newInvoice,
    });
  };

  const handleDelete = (id) => {
    setUrl(`/api/v1/invoices/${id}`);

    if (deletedData) {
      dispatch({
        type: "DELETE__INVOICES",
        payload: id,
      });
      showToastMessage(deletedData?.message);
    }

    // try {
    //   const { data } = await axios.delete(
    //     `http://localhost:5000/api/v1/invoices/${id}`
    //   );

    //   if (data) {
    //     // console.log("Deleted__Clients>>>>>", data);
    //     setIsLoading(false);
    //     setError(null);
    //     showToastMessage(data.message);
    //   }
    // } catch (error) {
    //   console.log("error", error.response.message);
    //   setIsLoading(false);
    //   setError(error.response.message);
    // }
  };

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className={styles.invoiceContainer}>
      <h1>Invoices</h1>

      {/********* Invoices Information ***********/}
      <div className={styles.invoicesInfo}>
        <div className={styles.invoices} onClick={getData}>
          <div className={styles.invoices_top}>
            <img src={totalInvoice} alt="" />
            <span style={{ color: "#6BDB65" }}>+25%</span>
          </div>
          <span>619</span>
          <span>Total Invoices</span>
        </div>
        <div
          className={styles.invoices}
          onClick={() => getPaidInvoices("Paid")}
        >
          <div className={styles.invoices_top}>
            <img src={paidInvoice} alt="" />
            <span style={{ color: "#6BDB65" }}>+10%</span>
          </div>
          <span>741</span>
          <span>Paid Invoices</span>
        </div>
        <div
          className={styles.invoices}
          onClick={() => getPaidInvoices("Unpaid")}
        >
          <div className={styles.invoices_top}>
            <img src={unpaidInvoice} alt="" />
            <span style={{ color: "#EE4444" }}>-15%</span>
          </div>
          <span>123</span>
          <span>Unpaid Invoices</span>
        </div>
        <div
          className={styles.invoices}
          onClick={() => getPaidInvoices("Draft")}
        >
          <div className={styles.invoices_top}>
            <img src={draft} alt="" />
            <span style={{ color: "#EE4444" }}>-3%</span>
          </div>
          <span>50</span>
          <span>Draft</span>
        </div>
      </div>

      {isLoading && <h1>Loading...</h1>}
      {error && <div>{error?.message}</div>}

      {!error && !isLoading && (
        <div className={styles.invoiceInfoTable}>
          <div className={styles.invoiceTableHead}>
            <h3 style={{ fontWeight: "400" }}>{invoiceHeading}</h3>
            <div
              className={styles.createContainer}
              style={{ display: "flex", gap: "5px" }}
            >
              <div
                onClick={() => navigate(`/dashboard/invoices/create/${id}`)}
                style={{
                  backgroundColor: "#7E39CA",
                  padding: "7.5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "13.5px",
                }}
                className={styles.createInvbtn}
              >
                Create Invoice
              </div>
              <div className={styles.btn__tabs}>
                <span
                  className={activeMonth ? styles.active : ""}
                  style={{ cursor: "pointer" }}
                  onClick={() => updateInvoiceDate("monthly")}
                >
                  Monthly
                </span>
                <span
                  className={activeWeek ? styles.active : ""}
                  style={{ cursor: "pointer" }}
                  onClick={() => updateInvoiceDate("weekly")}
                >
                  Weekly
                </span>
                <span
                  className={active ? styles.active : ""}
                  onClick={() => updateInvoiceDate("today")}
                >
                  Today
                </span>
              </div>
            </div>
          </div>

          {/* Invoice Info Table */}

          {allInvoice?.length === 0 && (
            <div
              style={{
                width: "100%",
                fontSize: "1.7rem",
                // textAlign: "center",
                marginTop: "3rem",
              }}
            >
              No invoices yet, Please Create One.
            </div>
          )}
          {!error && !isLoading && allInvoice?.length !== 0 && (
            <div className={styles.invoiceInfo_dashboard_table}>
              <table>
                <thead>
                  <tr className={styles.header__table}>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Project/Job</th>
                    <th>Status</th>
                    <th style={{ display: "" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {allInvoice &&
                    allInvoice?.map((invoice, id) => (
                      <tr key={id} className={styles.body__row}>
                        <td>
                          <div className={styles.invoiceUserInfo}>
                            <img
                              src={invoice?.job?.client?.image?.url}
                              alt=""
                            />
                            <div>
                              <span>
                                {invoice?.job?.client?.firstName +
                                  invoice?.job?.client?.lastName}
                              </span>
                              <span style={{ color: "#9BABC5" }}>
                                {invoice?.invoiceNumber.split("-")[0]}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{invoice?.dateOfIssue.split("T")[0]}</td>
                        <td>{invoice?.job?.client?.clientEmail}</td>
                        <td>
                          <CurrencyFormatter
                            amount={invoice?.job?.projectBudget}
                          />
                        </td>
                        <td style={{ color: "#9BABC5" }}>
                          {invoice?.job?.projectName}
                        </td>
                        <td className={styles.row_btn}>
                          <button onClick={() => ShowPopup(invoice?._id)}>
                            {invoice?.status}
                          </button>
                          {invoice.isStatus && mainInvoiceStatus && (
                            <div className={styles.popup2}>
                              {invoice?.status == "Unpaid" && (
                                <>
                                  <div
                                    onClick={() =>
                                      updateInvoiceStatus(
                                        "Paid",
                                        invoice?._id,
                                        invoice.isStatus
                                      )
                                    }
                                  >
                                    Paid
                                  </div>
                                  <div
                                    onClick={() =>
                                      updateInvoiceStatus(
                                        "Draft",
                                        invoice?._id,
                                        invoice.isStatus
                                      )
                                    }
                                  >
                                    Draft
                                  </div>
                                </>
                              )}
                              {console.log(":invoice.status::", invoice.status)}
                              {invoice?.status == "Draft" && (
                                <>
                                  <div
                                    onClick={() =>
                                      updateInvoiceStatus(
                                        "Paid",
                                        invoice?._id,
                                        invoice.isStatus
                                      )
                                    }
                                  >
                                    Paid
                                  </div>
                                  <div
                                    onClick={() =>
                                      updateInvoiceStatus(
                                        "Unpaid",
                                        invoice?._id,
                                        invoice.isStatus
                                      )
                                    }
                                  >
                                    UnPaid
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          <img
                            src={threeDots}
                            alt=""
                            style={{ height: "17px", cursor: "pointer" }}
                            onClick={() => handleShowPopup(invoice?._id)}
                          />
                          {invoice.isSelected && (
                            <div className={styles.popup}>
                              <div
                                onClick={() =>
                                  navigate(
                                    `/dashboard/invoice/createinvoice2/${invoice._id}`
                                  )
                                }
                              >
                                invoice detail
                              </div>
                              <div onClick={() => handleDelete(invoice?._id)}>
                                Delete
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Invoice Info Table */}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Invoice;
