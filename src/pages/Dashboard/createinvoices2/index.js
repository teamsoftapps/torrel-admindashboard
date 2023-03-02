import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import styles from "../Dashboard.module.css"
import CreateInvoice2 from "./createinvoice2/CreateInvoice2";

const CreateInvoices2 = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <CreateInvoice2/>
      </main>
    </div>
  );
};

export default CreateInvoices2;
