import React from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import SubInvoice from './SubInvoice/SubInvoice'
import styles from "../Dashboard.module.css";

const SubInvoices = () => {
  return (
    <div className={styles.container}>
    <aside className={styles.sidebar}>
      <Sidebar />
    </aside>
    <main className={styles.main_content}>
      <Topbar />
      <SubInvoice/>
    </main>
  </div>
  )
}

export default SubInvoices