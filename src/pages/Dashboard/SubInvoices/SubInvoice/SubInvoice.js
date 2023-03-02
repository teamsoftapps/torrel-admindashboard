import React, { useState } from "react";
import styles from "./SubInvoice.module.css";
import totalInvoice from "../../../../images/totalInvoice.png";
import paidInvoice from "../../../../images/paidInvoice.png";
import unpaidInvoice from "../../../../images/unpaidInvoice.png";
import draft from "../../../../images/draft.png";
// import profile from "../../../../images/profile.png";
import threeDots from "../../../../images/threeDots.png";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import { api } from "../../../../services/api";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetch } from "../../../../hooks/useFetch";
import { useInvoiceContext } from "../../../../hooks/useInvoiceContext";
import CurrencyFormatter from "../../../../utils/currencyFormatter";
// import { async } from "q";

const SubInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allDataUrl = `/api/v1/subinvoices/subjobs/${id}`;
  const [url, setUrl] = useState("");
  const {
    data: allSubInvoicesData,
    isLoading,
    error,
  } = useFetch(allDataUrl, "GET");
  const { data: deletedData } = useFetch(url, "DELETE");
  const [invoiceHeading, setInvoiceHeading] = useState("Sub Invoices");
  const [activeMonth, setActiveMonth] = useState(false);
  const [activeWeek, setActiveWeek] = useState(false);
  const [active, setActive] = useState(true);
  const [mainInvoiceStatus, setMainInvoiceStatus] = useState(true);
  const { dispatch, allSubInvoice } = useInvoiceContext();

  useEffect(() => {
    dispatch({
      type: "GET_ALL_SUB_INVOICE",
      payload: allSubInvoicesData?.data,
    });
  }, [dispatch, allSubInvoicesData]);

  console.log("allInvoice::::", allSubInvoice);
  const getData = () => {
    setInvoiceHeading("Sub Invoices");
    if (allSubInvoicesData) {
      dispatch({
        type: "GET_ALL_SUB_INVOICE",
        payload: allSubInvoicesData?.data,
      });
    }
  };

  const getPaidInvoices = async (status) => {
    // console.log("id",id)
    console.log("status", status);
    try {
      const { data } = await api.get(
        `/api/v1/subinvoices/subjobs/${id}?status=${status}`
      );
      if (data) {
        console.log("Query__Jobs>>>", data);
        dispatch({
          type: "GET_ALL_SUB_INVOICE",
          payload: data?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateInvoiceStatus = async (status, id, invoiceStatus) => {
    // console.log("status", status);
    // console.log("invoiceStatus", invoiceStatus);
    try {
      const { data } = await api.patch(`/api/v1/subinvoices/${id}`, {
        status,
      });
      console.log("data", data);
      setMainInvoiceStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateInvoiceDate = async (type) => {
    const date = new Date().toJSON().split("T")[0];
    console.log("date", date);

    try {
      const { data } = await api.get(
        `/api/v1/subinvoices/subjobs/${id}?date=${date}&type=${type}`
      );
      if (data) {
        console.log("Query__Jobs>>>", data);
        dispatch({
          type: "GET_ALL_SUB_INVOICE",
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
  };

  const ShowPopup = (id) => {
    console.log("allInvoice", allSubInvoice);
    const newSubInvoice = allSubInvoice.map((invoice) => {
      if (invoice._id === id) {
        return { ...invoice, isStatus: !invoice.isStatus };
      } else {
        return invoice;
      }
    });
    dispatch({
      type: "GET_ALL_SUB_INVOICE",
      payload: newSubInvoice,
    });
    setMainInvoiceStatus(true);
  };

  const handleShowPopup = (id) => {
    const newSubInvoice = allSubInvoice.map((invoice) => {
      if (invoice._id === id) {
        return { ...invoice, isSelected: !invoice.isSelected };
      } else {
        return invoice;
      }
    });
    dispatch({
      type: "GET_ALL_SUB_INVOICE",
      payload: newSubInvoice,
    });
  };

  const handleDelete = (id) => {
    setUrl(`/api/v1/subinvoices/${id}`);

    if (deletedData) {
      dispatch({
        type: "DELETE_SUB_INVOICES",
        payload: id,
      });
      showToastMessage(deletedData?.message);
    }
  };

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className={styles.invoiceContainer}>
      <h1>Sub Invoices</h1>

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
      {error && <div>{error}</div>}
      {!error && !isLoading && (
        <div className={styles.invoiceInfoTable}>
          <div className={styles.invoiceTableHead}>
            <h3 style={{ fontWeight: "400" }}>{invoiceHeading}</h3>
            <div
              className={styles.createContainer}
              style={{ display: "flex", gap: "5px" }}
            >
              <div
                onClick={() => navigate(`/dashboard/subinvoices/create/${id}`)}
                style={{
                  backgroundColor: "#7E39CA",
                  padding: "7.5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "13.5px",
                }}
                className={styles.createInvbtn}
              >
                Create SubInvoice
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
          {allSubInvoice?.length === 0 && (
            <div
              style={{
                width: "100%",
                fontSize: "1.7rem",
                // textAlign: "center",
                marginTop: "3rem",
              }}
            >
              No Sub Invoices yet, Please Create One.
            </div>
          )}
          {!error && !isLoading && allSubInvoice?.length !== 0 && (
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
                  {allSubInvoice &&
                    allSubInvoice?.map((subinvoice, id) => (
                      <tr key={id} className={styles.body__row}>
                        <td>
                          <div className={styles.invoiceUserInfo}>
                            <img
                              src={subinvoice?.subjob?.job?.client?.image?.url}
                              alt=""
                            />
                            <div>
                              <span>
                                {subinvoice?.subjob?.job?.client?.firstName +
                                  subinvoice?.subjob?.job?.client?.lastName}
                              </span>
                              <span style={{ color: "#9BABC5" }}>
                                {subinvoice?.invoiceNumber.split("-")[0]}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{subinvoice?.dateOfIssue.split("T")[0]}</td>
                        <td>{subinvoice?.subjob?.job?.client?.clientEmail}</td>
                        <td>
                          <CurrencyFormatter
                            amount={subinvoice?.subjob?.subJobBudget}
                          />
                        </td>
                        <td style={{ color: "#9BABC5" }}>
                          {subinvoice?.subjob?.subJobName}
                        </td>
                        <td className={styles.row_btn}>
                          <button onClick={() => ShowPopup(subinvoice?._id)}>
                            {subinvoice?.status}
                          </button>
                          {subinvoice.isStatus && mainInvoiceStatus && (
                            <div className={styles.popup2}>
                              {subinvoice?.status == "Unpaid" && (
                                <>
                                  <div
                                    onClick={() =>
                                      updateInvoiceStatus(
                                        "Paid",
                                        subinvoice?._id,
                                        subinvoice.isStatus
                                      )
                                    }
                                  >
                                    Paid
                                  </div>
                                  <div
                                    onClick={() =>
                                      updateInvoiceStatus(
                                        "Draft",
                                        subinvoice?._id,
                                        subinvoice.isStatus
                                      )
                                    }
                                  >
                                    Draft
                                  </div>
                                </>
                              )}
                              {console.log(
                                ":invoice.status::",
                                subinvoice.status
                              )}
                              {subinvoice?.status == "Draft" && (
                                <>
                                  <div
                                    onClick={() =>
                                      updateInvoiceStatus(
                                        "Paid",
                                        subinvoice?._id,
                                        subinvoice.isStatus
                                      )
                                    }
                                  >
                                    Paid
                                  </div>
                                  <div
                                    onClick={() =>
                                      updateInvoiceStatus(
                                        "Unpaid",
                                        subinvoice?._id,
                                        subinvoice.isStatus
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
                            onClick={() => handleShowPopup(subinvoice?._id)}
                          />
                          {subinvoice.isSelected && (
                            <div className={styles.popup}>
                              <div
                                onClick={() =>
                                  navigate(
                                    `/dashboard/subinvoices/createsubinvoice2/${subinvoice?._id}`
                                  )
                                }
                              >
                                Invoice
                              </div>
                              <div
                                onClick={() => handleDelete(subinvoice?._id)}
                              >
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

export default SubInvoice;
