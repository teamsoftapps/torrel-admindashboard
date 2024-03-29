import { Link, NavLink, useNavigate } from "react-router-dom";
import { useInvoiceContext } from "../../../hooks/useInvoiceContext";
import CLIENTS from "./../../../images/Clients.png";
// import CREATEINVOICES from "./../../../images/Create_Invoices.png";
import DASHBOARD from "./../../../images/Dashboard.png";
import INVOICES from "./../../../images/Invoices.png";
import PROJECTS from "./../../../images/Projects.png";
import TORRELLOGO from "./../../../images/torrelLogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout } from "../../../hooks/useLogout";
import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";

const links = [
  // {
  //   path: "/dashboard",
  //   src: DASHBOARD,
  //   text: "Dashboard",
  //   isActive: true,
  // },
  // {
  //   path: "/dashboard/clients",
  //   src: CLIENTS,
  //   text: "Clients",
  //   isActive: false,
  // },
  // {
  //   path: "/dashboard/projects",
  //   src: PROJECTS,
  //   text: "Projects",
  //   isActive: false,
  // },
  // {
  //   path: "/dashboard/subprojects",
  //   src: PROJECTS,
  //   text: "Sub Projects",
  //   isActive: false,
  // },
  // {
  //   path: "/dashboard/allinvoices",
  //   src: INVOICES,
  //   text: "Invoices",
  //   isActive: false,
  // },
  // {
  //   path: "/dashboard/allsubinvoices",
  //   src: INVOICES,
  //   text: "Sub Invoices",
  //   isActive: false,
  // },
  // {
  //   path: "/dashboard/invoices/create",
  //   src: CREATEINVOICES,
  //   text: "Create Invoices",
  //   isActive: false,
  // },
  {
    path: "/dashboard/superadmin/users",
    src: DASHBOARD,
    text: "All Users",
    isActive: false,
  },
];

const Sidebar = () => {
  const { isMobile, setIsMobile } = useInvoiceContext();
  // console.log(isMobile)
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [active, setActive] = useState("Dashboard");

  const handleActive = (text) => {
    localStorage.setItem("ActiveText", text);
  };
  useEffect(() => {
    const text = localStorage.getItem("ActiveText");
    setActive(text);
  });

  return (
    <div className={isMobile ? styles.mobile_container : styles.container}>
      <img src={TORRELLOGO} alt="Logo" onClick={() => navigate("/")} />
      <div className={styles.buttons}>
        {links?.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            className={link.isActive && styles.link_active}
            onClick={() => handleActive(link.text)}
          >
            <img src={link.src} alt={link.text} />
            <span onClick={() => setIsMobile(false)}> {link.text}</span>
          </NavLink>
        ))}
        <Link onClick={logout} to="#">
          <LogoutIcon />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
