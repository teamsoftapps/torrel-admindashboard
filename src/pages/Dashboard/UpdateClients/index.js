import React from "react";
import styles from "../Dashboard.module.css";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import UpdateClient from "./updateClient/UpdateClient";

const UpdateClients = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <UpdateClient />
      </main>
    </div>
  );
};

export default UpdateClients;
