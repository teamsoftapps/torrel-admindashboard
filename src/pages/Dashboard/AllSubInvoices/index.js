import Sidebar from "../Sidebar"
import Topbar from "../Topbar"
import styles from "../../Dashboard/Dashboard.module.css";
import AllSubInvoice from "./AllSubInvoices/AllSubInvoice";


const AllSubInvoices = () => {
  return (
    <div className={styles.container}>
    <aside className={styles.sidebar}>
      <Sidebar />
    </aside>
    <main className={styles.main_content}>
      <Topbar />
      <AllSubInvoice/>
    </main>
  </div>
  )
}

export default AllSubInvoices;