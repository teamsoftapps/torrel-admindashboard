import styles from "../Dashboard.module.css";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import ClientDetail from "./ClientDetail/ClientDetail";

const ClientDetails = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <ClientDetail />
      </main>
    </div>
  );
};

export default ClientDetails;
