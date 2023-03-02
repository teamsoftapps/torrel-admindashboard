import styles from "../Dashboard.module.css";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import AllSubProject from "./AllSubProject/AllSubProject";

const AllSubProjects = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <AllSubProject />
      </main>
    </div>
  );
};

export default AllSubProjects;
