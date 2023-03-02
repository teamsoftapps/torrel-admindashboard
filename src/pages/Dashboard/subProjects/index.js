import React from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import SubProject from './SubProject/SubProject'
import styles from "../Dashboard.module.css"


const SubProjects = () => {
  return (
    <div className={styles.container}>
    <aside className={styles.sidebar}>
      <Sidebar />
    </aside>
    <main className={styles.main_content}>
      <Topbar />
      <SubProject/>
    </main>
  </div>
  )
}

export default SubProjects