import classes from "./MailHeader.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import logo from "../../assets/logo.png";

const MailHeader = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("emailMC");

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className={classes.header}>
      <div className={classes.logoContainer}>
        <img src={logo} alt="MailBox Logo" className={classes.logo} />
        <h3>MailBox</h3>
      </div>
      <div className={classes.findText}>
        <input
          type="text"
          placeholder="Find messages, documents, photos or people"
        />
        <button className={classes.searchButton}>Search</button>
      </div>
      <div className={classes.userId}>{userId}</div>
      <div>
        <button className={classes.logout} onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default MailHeader;
