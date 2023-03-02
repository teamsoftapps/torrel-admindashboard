import React from 'react'
import styles from "../Dashboard.module.css"
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import Project from './Project/Project';


const Projects = () => {
  return (
    <div className={styles.container}>
    <aside className={styles.sidebar}>
      <Sidebar />
    </aside>
    <main className={styles.main_content}>
      <Topbar />
      <Project/>
    </main>
  </div>
  )
}

export default Projects;