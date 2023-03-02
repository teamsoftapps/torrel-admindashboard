import Sidebar from "../Sidebar"
import Topbar from "../Topbar"
import styles from "../Dashboard.module.css";
import Invoice from "./invoice/Invoice";


const Invoices = () => {
  return (
    <div className={styles.container}>
    <aside className={styles.sidebar}>
      <Sidebar />
    </aside>
    <main className={styles.main_content}>
      <Topbar />
      <Invoice/>
    </main>
  </div>
  )
}

export default Invoices
