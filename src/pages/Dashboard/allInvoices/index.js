import Sidebar from "../Sidebar"
import Topbar from "../Topbar"
import styles from "../../Dashboard/Dashboard.module.css";
import AllInvoice from "./allInvoice/AllInvoice";


const AllInvoices = () => {
  return (
    <div className={styles.container}>
    <aside className={styles.sidebar}>
      <Sidebar />
    </aside>
    <main className={styles.main_content}>
      <Topbar />
      <AllInvoice/>
    </main>
  </div>
  )
}

export default AllInvoices;