import { useState, useEffect } from "react";
import styles from "../../allInvoices/allInvoice/AllInvoice.module.css";
import "react-toastify/dist/ReactToastify.css";
// import { useFetch } from "../../../../hooks/useFetch";
import CurrencyFormatter from "../../../../utils/currencyFormatter";
import { api } from "../../../../services/api";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AllSubInvoice = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allSubInvoices, setAllSubInvoices] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // const allInvoicesUrl = `/api/v1/subinvoices`;
  // const {
  //   data: allSubInvoices,
  //   isLoading,
  //   error,
  // } = useFetch(allInvoicesUrl, "GET");
  // console.log("allInvoices", allSubInvoices?.data);
  const fetchAllSubInvoices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(
        `/api/v1/superadmin/users/subinvoices/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );

      if (data) {
        console.log("All_SubInvoices>>", data);
        setAllSubInvoices(data);
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
    fetchAllSubInvoices();
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
        <h1>All Sub Invoices</h1>
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
      {allSubInvoices?.data?.length === 0 && (
        <div
          style={{
            width: "100%",
            fontSize: "1.7rem",
            // textAlign: "center",
            marginTop: "3rem",
            color: "#7e39ca",
          }}
        >
          No Sub invoices corresponding to this user.
        </div>
      )}
      {!error && !isLoading && allSubInvoices?.data?.length !== 0 && (
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
                {allSubInvoices?.data?.map((invoice, id) => (
                  <tr key={id} className={styles.body__row}>
                    <td>
                      <div className={styles.invoiceUserInfo}>
                        <img src={invoice?.subjob?.job?.client?.image} alt="" />
                        <div>
                          <span>
                            {invoice?.subjob?.job?.client?.firstName +
                              invoice?.subjob?.job?.client?.lastName}
                          </span>
                          <span style={{ color: "#9BABC5" }}>
                            {invoice?.invoiceNumber.split("-")[0]}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{invoice?.dateOfIssue.split("T")[0]}</td>
                    <td>{invoice?.subjob?.job?.client?.clientEmail}</td>
                    <td>
                      <CurrencyFormatter
                        amount={invoice?.subjob?.subJobBudget}
                      />
                    </td>
                    <td style={{ color: "#9BABC5" }}>
                      {invoice?.subjob?.subJobName}
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

export default AllSubInvoice;
