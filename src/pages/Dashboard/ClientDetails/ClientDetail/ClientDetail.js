import styles from "./ClientDetail.module.css";
import WorkIcon from "@mui/icons-material/Work";
import { useFetch } from "../../../../hooks/useFetch";
import {
  useNavigate,
  // useSearchParams,
  // createSearchParams,
  useParams,
} from "react-router-dom";

const ClientDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `/api/v1/jobs/client/${id}`;
  const { data, isLoading, error } = useFetch(url);
  // const [clientId, setClientID] = useState("");
  // "/dashboard/projects"

  // const [searchparams] = useSearchParams();
  // console.log("searchparams__clientID>>>", searchparams.get("ID"));
  // let clientID = searchparams.get("ID");

  // const handleNavigate = () => {
  //   navigate({
  //     pathname: "/dashboard/projects",
  //     search: createSearchParams({
  //       new_ID: clientID,
  //     }).toString(),
  //   });
  // };

  console.log("jobs_data_from_custom_hook>>", data?.data);
  // console.log("jobs_data_id_from_custom_hook>>", data?.data[0]?._id)

  return (
    <div className={styles.container}>
      <h1>Client Details</h1>
      {isLoading && (
        <div style={{ color: "#ffffff", textAlign: "center" }}>Loading...</div>
      )}
      {/* CLINETS__JOB__SUBJOBS__INVOICE__DETAILS */}
      <div className={styles.card__container}>
        {/* CARDS */}
        <div
          className={styles.card}
          onClick={() => navigate(`/dashboard/projects/${id}`)}
        >
          <div className={styles.card_top}>
            {/* <img src={totalInvoice} alt="" /> */}
            <WorkIcon />
            <span style={{ color: "#6BDB65" }}>+25%</span>
          </div>
          <span>{data?.data?.length}</span>
          <span>Total Jobs</span>
        </div>
        {/* <div className={styles.card}>
          <div className={styles.card_top}>
            <img src={totalInvoice} alt="" />
            <WorkIcon />
            <span style={{ color: "#6BDB65" }}>+25%</span>
          </div>
          <span>10</span>
          <span>Sub Jobs</span>
        </div> */}
        <div
          className={styles.card}
          onClick={() => navigate(`/dashboard/invoices/${data?.data[0]?._id}`)}
        >
          <div className={styles.card_top}>
            {/* <img src={totalInvoice} alt="" /> */}
            <WorkIcon />
            <span style={{ color: "#6BDB65" }}>+25%</span>
          </div>
          <span>15</span>
          <span>Invoices</span>
        </div>
        {/* <div className={styles.card}>
          <div className={styles.card_top}>
            <img src={totalInvoice} alt="" />
            <WorkIcon />
            <span style={{ color: "#6BDB65" }}>+25%</span>
          </div>
          <span>12</span>
          <span>Total Jobs</span>
        </div> */}
      </div>
    </div>
  );
};

export default ClientDetail;
