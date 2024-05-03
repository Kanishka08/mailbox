import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/MailSlice";
import { useHistory } from "react-router-dom";
import classes from "./MailList.module.css";

const MailList = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const inbox = useSelector((state) => state.mail.inbox);
  const dispatch = useDispatch();
  const history = useHistory();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMailData = () => {
    axios
      .get(
        `https://mailbox-client-15225-default-rtdb.firebaseio.com/mails/${userId}inbox.json`
      )
      .then((response) => {
        const fetchedMails = response.data || {};
        dispatch(mailActions.setInbox(fetchedMails));

        // Calculate unread count
        const newUnreadCount = Object.values(fetchedMails).filter(
          (mail) => !mail.isRead
        ).length;
        setUnreadCount(newUnreadCount);
      })
      .catch((error) => console.error("Error fetching mail data:", error));
  };

  useEffect(() => {
    fetchMailData(); // Fetch mail data initially

    const intervalId = setInterval(fetchMailData, 2000); // Fetch mail data every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dispatch, userId]);

  const readMessageHandler = () => {
    // Update mail as read
    axios
      .put(
        `https://mailbox-client-15225-default-rtdb.firebaseio.com/mails/${userId}inbox/${props.id}.json`,
        {
          ...props,
          isRead: true,
        }
      )
      .then(() => {
        dispatch(mailActions.updateMail({ ...props, isRead: true }));
      })
      .catch((err) => alert(err));

    history.push("./readMail");
  };

  const deleteMailHandler = () => {
    // Delete mail
    axios
      .delete(
        `https://mailbox-client-15225-default-rtdb.firebaseio.com/mails/${userId}inbox/${props.id}.json`
      )
      .then(() => {
        dispatch(mailActions.deleteMail(props.id));
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={classes.list}>
      <div className={classes.symbolTo} onClick={readMessageHandler}>
        {!props.isRead && <div className={classes.circle} />}
        <div className={classes.to}>{props.to}</div>
      </div>
      <div className={classes.subject}>{props.subject}</div>
      <div className={classes.delete}>
        <button onClick={deleteMailHandler}>Delete</button>
      </div>
    </div>
  );
};

export default MailList;
