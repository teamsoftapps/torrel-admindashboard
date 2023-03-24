import styles from "../Dashboard.module.css";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import UserDetail from "./UserDetail/UserDetail";

const UsersDetails = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <UserDetail />
      </main>
    </div>
  );
};

export default UsersDetails;
