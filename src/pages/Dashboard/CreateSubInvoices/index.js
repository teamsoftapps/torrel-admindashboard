import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import CreateSubInvoice from "./CreateSubInvoice/CreateSubInvoice";
import styles from "../Dashboard.module.css";
import { useInvoiceContext } from "../../../hooks/useInvoiceContext";

const CreateSubInvoices = () => {
  const [jobId, setJobID] = useState(null);
  const { clientId, setClientId } = useInvoiceContext();

  useEffect(() => {
    setJobID(localStorage.getItem("job_id"));
    setClientId(localStorage.getItem("client_id"));
  }, []);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <CreateSubInvoice jobId={jobId} clientId={clientId} />
      </main>
    </div>
  );
};

export default CreateSubInvoices;
