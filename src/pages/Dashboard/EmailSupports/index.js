import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import styles from "../Dashboard.module.css";
import EmailSupport from "./EmailSupport/EmailSupport";

const EmailSupports = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <EmailSupport />
      </main>
    </div>
  );
};

export default EmailSupports;
