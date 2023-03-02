import React from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import styles from "../Dashboard.module.css"
import CreateSubInvoice2 from './CreateSubInvoice2/CreateSubInvoice2'

const CreateSubInvoices2  = () => {
  return (
    <div className={styles.container}>
    <aside className={styles.sidebar}>
      <Sidebar />
    </aside>
    <main className={styles.main_content}>
      <Topbar />
      <CreateSubInvoice2/>
    </main>
  </div>
  )
}

export default CreateSubInvoices2;