import Create from "./Create/Create";
import styles from "../Dashboard.module.css";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

const CreateProjects = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <Create />
      </main>
    </div>
  );
};

export default CreateProjects;
