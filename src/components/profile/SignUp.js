import { useRef, useState } from "react";
import classes from "./SignUp.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import logo from "../../assets/logo.png";

const SignUp = (props) => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let confirmPassword;
    if (!isLogin) {
      confirmPassword = confirmPasswordInputRef.current.value;
    }

    let url;

    if (!isLogin) {
      if (enteredPassword !== confirmPassword) {
        alert("password mismatch");
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDw0tBiYioQS2e87y_sfEGYiEVA5qabd0A";
      }
    } else if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDw0tBiYioQS2e87y_sfEGYiEVA5qabd0A";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.message)
              errorMessage = data.error.message;

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (!isLogin) {
          alert("Successfully Signed up");
        } else {
          alert("Successfully Logged in");
        }
        dispatch(authActions.login(data.idToken));
        dispatch(authActions.setUserId(enteredEmail));
        history.push("/composeMail");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.div}>
      <div className={classes.heading}>
        <img src={logo} alt="MailBox Logo" className={classes.logo} />
        <h1 className={classes["heading-text"]}>Welcome to mailbox</h1>
      </div>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Signup"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="text" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                required
                ref={confirmPasswordInputRef}
              />
            </div>
          )}
          <div className={classes.actions}>
            <button type="submit">{isLogin ? "Login" : "SignUp"}</button>
          </div>
        </form>
      </section>

      <button
        type="button"
        className={classes.toggle}
        onClick={switchAuthModeHandler}
      >
        {isLogin ? "Dont have an account? SignUp" : "Have an Account?Login"}
      </button>
    </div>
  );
};

export default SignUp;
