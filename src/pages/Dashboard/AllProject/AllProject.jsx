import styles from "../Dashboard.module.css";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import AllProjects from "../AllProject/AllProjects/AllProjects";

const AllProject = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <AllProjects />
      </main>
    </div>
  );
};

export default AllProject;
