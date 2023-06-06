import { useState, useEffect } from "react";
import styles from "./AllInvoice.module.css";
import "react-toastify/dist/ReactToastify.css";
// import { useFetch } from "../../../../hooks/useFetch";
import CurrencyFormatter from "../../../../utils/currencyFormatter";
import { api } from "../../../../services/api";
// import { useInvoiceContext } from "../../../../hooks/useInvoiceContext";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { async } from "q";

const AllInvoice = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allInvoices, setAllInvoices] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  // const { dispatch, allInvoice: allInvoices } = useInvoiceContext();
  // const allInvoicesUrl = `/api/v1/invoices`;
  // const {
  //   data: allInvoices,
  //   isLoading,
  //   error,
  // } = useFetch(allInvoicesUrl, "GET");

  // console.log("allInvoices", allInvoices?.data);

  const fetchAllInvoices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(
        `/api/v1/superadmin/users/invoices/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );
      if (data) {
        console.log("All_Invoices>>>", data);
        // dispatch({
        //   type: "GET_ALL_INVOICE",
        //   payload: data?.data,
        // });
        setAllInvoices(data);
      }
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllInvoices();
  }, []);

  return (
    <div className={styles.invoiceContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>All Invoices</h1>
        <Link style={{ color: "#fff" }} onClick={() => navigate(-1)}>
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgb(126, 57, 202)",
            }}
          >
            <ArrowBackIcon style={{ fontSize: "1.8rem" }} />
            Back
          </h2>
        </Link>
      </div>
      {isLoading && <h1>Loading...</h1>}
      {error && <div>{error?.message}</div>}
      {allInvoices?.data?.length === 0 && (
        <div
          style={{
            width: "100%",
            fontSize: "1.7rem",
            // textAlign: "center",
            marginTop: "3rem",
            color: "#7e39ca",
          }}
        >
          No invoices Added yet.
        </div>
      )}
      {!error && !isLoading && allInvoices?.data?.length !== 0 && (
        <div className={styles.invoiceInfoTable}>
          {/* Invoice Info Table */}

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
                  {/* <th style={{ display: "" }}></th> */}
                </tr>
              </thead>
              <tbody>
                {allInvoices?.data?.map((invoice, id) => (
                  <tr key={id} className={styles.body__row}>
                    <td>
                      <div className={styles.invoiceUserInfo}>
                        <img src={invoice?.job?.client?.image} alt="" />
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
                      <CurrencyFormatter amount={invoice?.job?.projectBudget} />
                    </td>
                    <td style={{ color: "#9BABC5" }}>
                      {invoice?.job?.projectName}
                    </td>
                    <td className={styles.row_btn}>
                      <button disabled>{invoice?.status}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Info Table */}
        </div>
      )}
    </div>
  );
};

export default AllInvoice;
