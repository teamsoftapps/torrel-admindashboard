import React from "react";
import styles from "../Dashboard.module.css";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import { useEffect } from "react";
import { useState } from "react";
import UserSetting from "./UserSetting/UserSetting";

const UserSettings = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main_content}>
        <Topbar />
        {/* <ErrorBoundary> */}
        <UserSetting />
        {/* </ErrorBoundary> */}
      </main>
    </div>
  );
};

export default UserSettings;
