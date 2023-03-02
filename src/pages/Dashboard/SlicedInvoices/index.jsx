import React from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import SlicedInvoice from './SlicedInvoice/SlicedInvoice'
import styles from "../Dashboard.module.css"

const SlicedInvoices = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar/>
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <SlicedInvoice/>
      </main>
    </div>
  )
}

export default SlicedInvoices
