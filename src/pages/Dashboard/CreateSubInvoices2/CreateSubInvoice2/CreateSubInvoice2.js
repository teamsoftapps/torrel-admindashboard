import { useEffect, useState } from "react";
import styles from "../../createinvoices2/createinvoice2/CreateInvoice2.module.css";
import trashcan from "../../../../images/trashcan.png";
import whiteEye from "../../../../images/eyeWhite.png";
// import editBlue from "../../../../images/editBlue.png";
// import editBlack from "../../../../images/editBlack.png";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import CurrencyFormatter from "../../../../utils/currencyFormatter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../../../services/api";
// import axios from "axios";

const CreateSubInvoice2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [singleSubInvoice, setSubsingleSubInvoice] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.get(`/api/v1/subinvoices/${id}`);

      if (data) {
        setIsLoading(false);
        setError(null);
        console.log("all jobs==>", data.data);
        setSubsingleSubInvoice(data.data[0]);
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
        "/api/v1/subinvoices/generate",
        singleSubInvoice
      );
      console.log("data", data);
      showToastMessage(data.message);
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
    // {console.log("singleSubInvoice",singleSubInvoice)}
    <div className={styles.savedInvoices}>
      <h1>Invoice Detail</h1>
      {loading && <h1>Loading...</h1>}
      {error && <div>{error?.message}</div>}
      {!error && !loading && singleSubInvoice && (
        <div className={styles.sendInvoice}>
          {/* Heading */}
          <div className={styles.heading}>
            <div className={styles.headingLeft}>
              <h2>
                INVOICE
                <br />
                {singleSubInvoice?.invoiceNumber?.split("-")[0]}
              </h2>
              <div className={styles.btns}>
                <button style={{ display: "none" }}>
                  <img src={trashcan} alt="" />
                </button>
                <button onClick={postData}>Send Invoice</button>
                <button
                  onClick={() => navigate(`/dashboard/subinvoiceprint/${id}`)}
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
                  <p>{singleSubInvoice?.companyAddress}</p>
                  <p>{singleSubInvoice?.companyEmail}</p>
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
                    {singleSubInvoice?.subJob?.job?.client?.firstName +
                      singleSubInvoice?.subJob?.job?.client?.lastName}
                  </h3>
                  <p>{singleSubInvoice?.subJob?.job?.client?.address}</p>
                  <p>{singleSubInvoice?.subJob?.job?.client?.clientEmail}</p>
                  <p>{singleSubInvoice?.subJob?.job?.client?.phone}</p>
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
                  <span>{singleSubInvoice?.order?.split("-")[0]}</span>
                </div>
              </div>
              <div className={styles.itemMiddle}>
                <div>
                  <span>Start</span>
                  <span>{singleSubInvoice?.dateOfIssue?.split("T")[0]}</span>
                </div>
                <div>
                  <span>Stop</span>
                  <span>{singleSubInvoice?.dueDate?.split("T")[0]}</span>
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
                    <td>{singleSubInvoice?.quantity}</td>
                    <td>{singleSubInvoice?.itemTitle}</td>

                    <td
                      style={{
                        fontWeight: "100",
                        fontSize: "13.5px",
                      }}
                    >
                      <CurrencyFormatter amount={singleSubInvoice?.price} />
                    </td>
                    <td
                      style={{
                        fontWeight: "100",
                        fontSize: "13.5px",
                      }}
                    >
                      <CurrencyFormatter amount={singleSubInvoice?.subTotal} />
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
              <CurrencyFormatter amount={singleSubInvoice?.totalDue} />
            </strong>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateSubInvoice2;
