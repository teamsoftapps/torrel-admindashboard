import React from "react";
import CreateClient from "./createClient/CreateClient";
import styles from "../Dashboard.module.css";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";

const CreateClients = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <CreateClient />
      </main>
    </div>
  );
};

export default CreateClients;
