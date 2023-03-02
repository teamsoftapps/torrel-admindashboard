import styles from "./Dashboard.module.css";
import HomePage from "./HomePage";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <HomePage />
      </main>
    </div>
  );
};

export default Dashboard;
