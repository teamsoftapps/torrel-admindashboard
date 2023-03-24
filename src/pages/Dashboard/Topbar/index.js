import SEARCH from "./../../../images/Search.png";
import ENVELOPE from "./../../../images/Envelope.png";
import SETTINGGEAR from "./../../../images/SettingGear.png";
import RING from "./../../../images/Ring.png";
import styles from "./Topbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import adminLogo from "../../../images/torrel_black.png";
import CloseIcon from "@mui/icons-material/Close";
import { useInvoiceContext } from "../../../hooks/useInvoiceContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Topbar = () => {
  const { user } = useAuthContext();
  const { isMobile, setIsMobile } = useInvoiceContext();

  return (
    <div className={styles.container}>
      <button className={styles.mobile_menu_btn}>
        {isMobile ? (
          <CloseIcon
            style={{ fontSize: "20px" }}
            onClick={() => setIsMobile(false)}
          />
        ) : (
          <MenuIcon
            style={{ fontSize: "20px" }}
            onClick={() => setIsMobile(true)}
          />
        )}
      </button>
      <div className={styles.search}>
        <form>
          <div className={styles.form_control}>
            <label htmlFor="search">
              <img src={SEARCH} alt="Search" />
              <input type="text" id="search" placeholder="Search..." />
            </label>
          </div>
        </form>
      </div>
      <div className={styles.options}>
        <button>
          <img src={RING} alt="Ring" />
          <span></span>
        </button>
        <Link to="/dashboard/emailsupport">
          <img src={ENVELOPE} alt="Envelope" />
          <span></span>
        </Link>
        <button>
          <img src={SETTINGGEAR} alt="SettingGear" />
        </button>
      </div>
      <div className={styles.user_info}>
        <div className={styles.name_role}>
          <p>{user?.data?.name.substring(0, 6)}</p>
          <p>Admin</p>
        </div>
        <div className={styles.image}>
          <img src={user?.data?.userImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
