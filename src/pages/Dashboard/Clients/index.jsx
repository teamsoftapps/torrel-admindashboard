// import React from 'react'
// import styles from "./Clients.module.css"
// import hamburger from "../../../images/hamburger.png"
// import dashboardIcon from "../../../images/dashboardIcon.png"

// const Clients = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//          <h2>Clients</h2>
//          <div className={styles.icon}>
//              <img src={hamburger} alt="" />
//              <img src={dashboardIcon} alt="" />
//          </div>
//       </div>
//     </div>
//   )
// }

// export default Clients

import styles from "../Dashboard.module.css";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import Client from "./Client/Client";

const Clients = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        <Client/>
      </main>
    </div>
  );
};

export default Clients;