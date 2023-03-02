import React, { useRef } from "react";
import styles from "../InvoiceA4/InvoiceA4.module.css";
import torrelBlackLogo from "../../../images/torrel_black.png";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { api } from "../../../services/api";
import { useEffect } from "react";
import JsPDF from "jspdf";
import CurrencyFormatter from "../../../utils/currencyFormatter";
// const downloadsFolder = require("downloads-folder");
// import downloadsFolder from "downloads-folder";

const SubInvoiceA4 = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
        setSingleInvoice(data?.data[0]);
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

  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", "a4");
    report.html(document.querySelector("#report")).then(() => {
      report.save("report.pdf");
    });
    window.plugin.email.open({
      to: ["muneebwaseem78@gmail.com"],
      subject: "New PDF!",
      body: "Hi there, here is that new PDF you wanted!",
      isHTML: true,
      attachments: [report],
    });
  };

  // console.log("downloads folder", downloadsFolder());
console.log(":::singleInvoice",singleInvoice)
  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <div>{error}</div>}
      {!error && !loading && (
        <div className={styles.invoiceA4__container}>
          <div
            className={styles.invoiceA4__size}
            ref={componentRef}
            id={"report"}
          >
            <div className={styles.printTop}>
              <img src={torrelBlackLogo} alt="" />
              <div className={styles.content_top}>
                <div className={styles.content_top_left}>
                  <span>Torrel Alexis Inc.</span>
                  <span>7146584031</span>
                </div>
                <div className={styles.content_top_right}>
                  <span>4605 SHASTA CIR</span>
                  <span style={{ color: "grey" }}>Address Line 2</span>
                  <span>CYPRESS, California</span>
                  <span>90630</span>
                  <span>United States</span>
                </div>
              </div>
            </div>

            <div className={styles.middle}>
              <div className={styles.middle1}>
                <span
                  style={{
                    color: "#296fa8",
                    fontWeight: "500",
                    fontSize: "17px",
                  }}
                >
                  Biiled To
                </span>
                {/* <div className={styles.billedTo}>
                <span>+</span>
                <span>Add a Client</span>
              </div> */}

                <div
                  style={{ color: "#333", fontSize: "12px", fontWeight: "500" }}
                >
                  {singleInvoice?.subJob?.job?.client?.firstName +
                    " " +
                    singleInvoice?.subJob?.job?.client?.lastName}
                </div>

                <div
                  style={{ color: "#333", fontSize: "12px", fontWeight: "500" }}
                >
                  {singleInvoice?.subJob?.job?.client?.clientEmail}
                </div>
                <div
                  style={{ color: "#333", fontSize: "12px", fontWeight: "500" }}
                >
                  {singleInvoice?.subJob?.job?.client?.phone}
                </div>
                <div
                  style={{ color: "#333", fontSize: "12px", fontWeight: "500" }}
                >
                  {singleInvoice?.subJob?.job?.client?.address}
                </div>
              </div>
              <div className={styles.middle2}>
                <div className={styles.issueDate}>
                  <span style={{ color: "#296fa8", fontWeight: "500" }}>
                    Date of Issue
                  </span>
                  <span>{singleInvoice?.dateOfIssue?.split("T")[0]}</span>
                </div>
                <div className={styles.dueDate}>
                  <span style={{ color: "#296fa8", fontWeight: "500" }}>
                    Due Date
                  </span>
                  <span>{singleInvoice?.dueDate?.split("T")[0]}</span>
                </div>
              </div>
              <div className={styles.middle3}>
                <div className={styles.invoiceNumber}>
                  <span style={{ color: "#296fa8", fontWeight: "500" }}>
                    Invoice Number
                  </span>
                  <span>{singleInvoice?.invoiceNumber?.split("-")[0]}</span>
                </div>
                <div className={styles.reference}>
                  <span style={{ color: "#296fa8", fontWeight: "500" }}>
                    Reference
                  </span>
                  <span>{singleInvoice?.order?.split("-")[0]}</span>
                </div>
              </div>
              <div className={styles.middle4}>
                <span
                  style={{
                    color: "#296fa8",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                  }}
                >
                  Amount Due (USD)
                </span>
                <span
                  style={{
                    color: "#333",
                    fontWeight: "500",
                    fontSize: "2.5rem",
                  }}
                >
                  <CurrencyFormatter amount={singleInvoice?.totalDue}/>
                </span>
              </div>
            </div>

            <hr />
            <div className={styles.descContainer}>
              <div className={styles.description}>
                <p>Description</p>
                <p style={{ color: "#333D46" }}>{singleInvoice?.description}</p>
              </div>
              <div className={styles.descRight}>
                <div>
                  <p>Rate</p>
                  <p style={{ color: "#333D46" }}><CurrencyFormatter amount={singleInvoice?.price}/></p>
                </div>

                <div>
                  <p>Qty</p>
                  <p style={{ color: "#333D46" }}>{singleInvoice?.quantity}</p>
                </div>

                <div>
                  <p>Line Total</p>
                  <p style={{ color: "#333D46" }}><CurrencyFormatter amount={singleInvoice?.subTotal}/></p>
                </div>
              </div>
            </div>

            {/* <div
            className={styles.billedTo}
            style={{
              padding: "0px",
              borderRadius: "3",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <span>+</span>
            <span>Add a Line</span>
          </div> */}

            <div className={styles.invoiceCalculation}>
              <div className={styles.inner}>
                <div>
                  <p>Subtotal</p>
                  <p><CurrencyFormatter amount={singleInvoice?.subTotal}/></p>
                </div>
                <div>
                  <p>Discount</p>
                  <p><CurrencyFormatter amount={singleInvoice?.discount}/></p>
                </div>
                <div>
                  <p>Tax</p>
                  <p><CurrencyFormatter amount={singleInvoice?.tax}/></p>
                </div>
                <hr />
                <div>
                  <p>Total</p>
                  <p><CurrencyFormatter amount={singleInvoice?.subTotal}/></p>
                </div>
                <div>
                  <p>Amount Paid</p>
                  <p><CurrencyFormatter amount={singleInvoice?.amountPaid}/></p>
                </div>
                <hr />
                <div>
                  <p style={{ color: "#296fa8" }}>Amount Due (USD)</p>
                  <p><CurrencyFormatter amount={singleInvoice?.totalDue}/></p>
                </div>
                {/* <div>
                <p style={{ color: "#296fa8" }}>Request a Deposit</p>
              </div> */}
              </div>
            </div>

            <div style={{ marginTop: "1rem" }} className={styles.para}>
              <p>Notes</p>
              <p>{singleInvoice?.notes || "No Notes!"}</p>
            </div>

            <div style={{ marginTop: "2.5rem" }} className={styles.para}>
              <p>Terms</p>
              <p>
                {singleInvoice?.termsAndCondition || "No terms and conditions!"}
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        style={{ position: "absolute", top: 100, left: 100, cursor: "pointer" }}
        onClick={handlePrint}
      >
        Print Invoice
      </button>
    </>
    );
};

export default SubInvoiceA4;
