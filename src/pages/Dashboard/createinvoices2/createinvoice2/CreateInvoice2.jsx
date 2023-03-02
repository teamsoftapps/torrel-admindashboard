import React, { useEffect } from "react";
import styles from "./CreateInvoice2.module.css";
import trashcan from "../../../../images/trashcan.png";
import whiteEye from "../../../../images/eyeWhite.png";
// import editBlue from "../../../../images/editBlue.png";
// import editBlack from "../../../../images/editBlack.png";
// import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import { api } from "../../../../services/api";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrencyFormatter from "../../../../utils/currencyFormatter";

const CreateInvoice2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [singleInvoice, setSingleInvoice] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.get(`/api/v1/invoices/${id}`);

      if (data) {
        setIsLoading(false);
        setError(null);
        console.log("all jobs==>", data.data);
        setSingleInvoice(data.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data);
      console.log("all jobs error==>", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const postData = async () => {
    try {
      const { data } = await api.post(
        "/api/v1/invoices/generate",
        singleInvoice
      );

      console.log("data", data);
      if (data) {
        showToastMessage(data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className={styles.savedInvoices}>
      <h1>Invoice Detail</h1>
      {loading && <h1>Loading...</h1>}
      {error && <div>{error}</div>}
      {!error && !loading && singleInvoice && (
        <div className={styles.sendInvoice}>
          {/* Heading */}
          <div className={styles.heading}>
            <div className={styles.headingLeft}>
              <h2>
                INVOICE
                <br />
                {singleInvoice?.invoiceNumber?.split("-")[0]}
              </h2>
              <div className={styles.btns}>
                <button style={{ display: "none" }}>
                  <img src={trashcan} alt="" />
                </button>
                <button onClick={postData}>Send Invoice</button>
                <button
                  onClick={() => navigate(`/dashboard/invoiceprint/${id}`)}
                  // onClick={() => navigate(`/dashboard/subinvoiceprint`)}
                >
                  <img src={whiteEye} alt="" />
                  <span>View</span>
                </button>
              </div>
            </div>
            <div className={styles.headingRight}>
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <span>FROM</span>
                  {/* <button>
                    <img src={editBlue} alt="" />
                  </button> */}
                </div>
                <div className={styles.cardContent}>
                  <h3>Torrel</h3>
                  <p>{singleInvoice?.companyAddress}</p>
                  <p>{singleInvoice?.companyEmail}</p>
                  <p>+839 8272 9944</p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <span>BILL TO</span>
                  {/* <button>
                    <img src={editBlack} alt="" />
                  </button> */}
                </div>
                <div className={styles.cardContent}>
                  <h3>
                    {singleInvoice?.job?.client?.firstName +
                      singleInvoice?.job?.client?.lastName}
                  </h3>
                  <p>{singleInvoice?.job?.client?.address}</p>
                  <p>{singleInvoice?.job?.client?.clientEmail}</p>
                  <p>{singleInvoice?.job?.client?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* invoices List */}
          <div className={styles.invoiceList}>
            <div className={styles.listItem}>
              <div className={styles.itemLeft}>
                {/* <div>
                <span>Time</span>
                <span>Oktober-15-2020</span>
              </div> */}
                <div>
                  <span>Order</span>
                  <span>{singleInvoice?.order?.split("-")[0]}</span>
                </div>
              </div>
              <div className={styles.itemMiddle}>
                <div>
                  <span>Start</span>
                  <span>{singleInvoice?.dateOfIssue?.split("T")[0]}</span>
                </div>
                <div>
                  <span>Stop</span>
                  <span>{singleInvoice?.dueDate?.split("T")[0]}</span>
                </div>
              </div>
              <div className={styles.itemRight}>
                {/* <button>
                  <img src={editBlack} alt="" />
                </button> */}
              </div>
            </div>
          </div>

          {/* invoices product List */}
          <div className={styles.invoiceProduct}>
            {/* Invoice product table here */}
            <table>
              <thead>
                <tr className={styles.header__table}>
                  <th>Qty</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Sub Total</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {[1].map((ind) => (
                  <tr key={ind} className={styles.body__row}>
                    <td> {singleInvoice?.quantity}</td>
                    <td>{singleInvoice?.itemTitle}</td>

                    <td
                      style={{
                        fontWeight: "100",
                        fontSize: "13.5px",
                      }}
                    >
                      <CurrencyFormatter amount={singleInvoice?.price} />
                    </td>
                    <td
                      style={{
                        fontWeight: "100",
                        fontSize: "13.5px",
                      }}
                    >
                      <CurrencyFormatter amount={singleInvoice?.subTotal} />
                    </td>
                    <td className={styles.table__editBtn}>
                      {/* <button>
                        <img src={editBlack} alt="" />
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.productPrice}>
            <span>Amount Due</span>
            <strong>
              {" "}
              <CurrencyFormatter amount={singleInvoice?.totalDue} />
            </strong>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateInvoice2;
