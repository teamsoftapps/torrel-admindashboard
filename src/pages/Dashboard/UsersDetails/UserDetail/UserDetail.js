import { useEffect, useState } from "react";
import styles from "../../ClientDetails/ClientDetail/ClientDetail.module.css";
import WorkIcon from "@mui/icons-material/Work";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DescriptionIcon from "@mui/icons-material/Description";
import { useAuthContext } from "../../../../hooks/useAuthContext";
// import totalInvoice from "../../../../images/totalInvoice.png";
// import { useFetch } from "../../../../hooks/useFetch";
import {
  useNavigate,
  // useSearchParams,
  // createSearchParams,
  useParams,
} from "react-router-dom";
import { api } from "../../../../services/api";

const UserDetail = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [subjobs, setSubJobs] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [subinvoices, setSubInvoices] = useState([]);
  // const client_url = `/api/v1/superadmin/users/clients/${id}`;
  // const job_url = `/api/v1/superadmin/users/jobs/${id}`;
  // const subjob_url = `/api/v1/superadmin/users/jobs/${id}`;
  // const invoice_url = `/api/v1/superadmin/users/invoices/${id}`;
  // const subinvoice_url = `/api/v1/superadmin/users/subinvoices/${id}`;
  const navigate = useNavigate();
  // const { data: clients, isLoading, error } = useFetch(client_url);
  // const { data: jobs } = useFetch(job_url);
  // const { data: subjobs } = useFetch(subjob_url);
  // const { data: invoices } = useFetch(invoice_url);
  // const { data: subinvoices } = useFetch(subinvoice_url);
  // console.log("data>>>", data);

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
        console.log("clients>>", data);
        setClients(data);
      }
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error);
    }
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/v1/superadmin/users/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        console.log("clients>>", data);
        setJobs(data);
      }
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error);
    }
  };

  const fetchSubJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/v1/superadmin/users/subjobs/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        console.log("clients>>", data);
        setSubJobs(data);
      }
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error);
    }
  };

  const fetchInvoices = async () => {
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
        console.log("clients>>", data);
        setInvoices(data);
      }
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error);
    }
  };

  const fetchSubInvoices = async () => {
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
        console.log("clients>>", data);
        setSubInvoices(data);
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

    fetchJobs();

    fetchSubJobs();

    fetchInvoices();

    fetchSubInvoices();
  }, []);

  return (
    <div className={styles.container}>
      <h1>User Details</h1>
      {/* {isLoading && (
        <div style={{ color: "#ffffff", textAlign: "center" }}>Loading...</div>
      )} */}
      {/* CLINETS__JOB__SUBJOBS__INVOICE__DETAILS */}
      <div className={styles.card__container}>
        {/* CARDS */}
        <div
          className={styles.card}
          onClick={() => navigate(`/dashboard/superadmin/users/clients/${id}`)}
        >
          <div className={styles.card_top}>
            {/* <img src={totalInvoice} alt="" /> */}
            <GroupIcon />
            <span style={{ color: "#6BDB65" }}>+25%</span>
          </div>
          <span>{clients?.results}</span>
          <span>Clients</span>
        </div>
        <div
          className={styles.card}
          onClick={() => navigate(`/dashboard/superadmin/users/jobs/${id}`)}
        >
          <div className={styles.card_top}>
            {/* <img src={totalInvoice} alt="" /> */}
            <WorkIcon />
            <span style={{ color: "#6BDB65" }}>+25%</span>
          </div>
          <span>{jobs?.results}</span>
          <span>Jobs</span>
        </div>
        <div
          className={styles.card}
          onClick={() => navigate(`/dashboard/superadmin/users/subjobs/${id}`)}
        >
          <div className={styles.card_top}>
            {/* <img src={totalInvoice} alt="" /> */}
            <WorkHistoryIcon />
            <span style={{ color: "#6BDB65" }}>+25%</span>
          </div>
          <span>{subjobs?.results}</span>
          <span>Sub Jobs</span>
        </div>
        <div
          className={styles.card}
          onClick={() => navigate(`/dashboard/superadmin/users/invoices/${id}`)}
        >
          <div className={styles.card_top}>
            {/* <img src={totalInvoice} alt="" /> */}
            <ReceiptIcon />
            <span style={{ color: "#6BDB65" }}>+25%</span>
          </div>
          <span>{invoices?.results}</span>
          <span>Invoices</span>
        </div>
        <div
          className={styles.card}
          onClick={() =>
            navigate(`/dashboard/superadmin/users/subinvoices/${id}`)
          }
        >
          <div className={styles.card_top}>
            {/* <img src={totalInvoice} alt="" /> */}
            <DescriptionIcon />
            <span style={{ color: "#6BDB65" }}>+25%</span>
          </div>
          <span>{subinvoices?.results}</span>
          <span>Sub Invoices</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
