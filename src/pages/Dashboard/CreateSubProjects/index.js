import { useEffect } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import CreateSubProject from "./CreateSubProject/CreateSubProject";
import styles from "../Dashboard.module.css";
import { useInvoiceContext } from "../../../hooks/useInvoiceContext";

const CreateSubProjects = () => {
  const { clientId, setClientId } = useInvoiceContext();

  useEffect(() => {
    setClientId(localStorage.getItem("client_id"));
  }, []);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <CreateSubProject clientId={clientId} />
      </main>
    </div>
  );
};

export default CreateSubProjects;
