import styles from "../Dashboard.module.css";
import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import UserList from "./User/UserList";

const SuperAdmin = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <UserList />
      </main>
    </div>
  );
};

export default SuperAdmin;
