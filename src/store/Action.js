import { AuthsliceAction } from "./Auth";

const loginURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDw0tBiYioQS2e87y_sfEGYiEVA5qabd0A";
const signupUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDw0tBiYioQS2e87y_sfEGYiEVA5qabd0A";
const RestUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDw0tBiYioQS2e87y_sfEGYiEVA5qabd0A";
export const sendsignup = (obj) => {
  return async (dispatch) => {
    const sendingAuth = async () => {
      const response = await fetch(signupUrl, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error.message);
        throw new Error(data.error.message);
      }

      return data;
    };
    try {
      const data = await sendingAuth();
      dispatch(AuthsliceAction.Login(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const Sendlogin = (obj) => {
  return async (dispatch) => {
    const sendingloginAuth = async () => {
      const response = await fetch(loginURL, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error.message);
        throw new Error(data.error.message);
      }

      return data;
    };
    try {
      const data = await sendingloginAuth();
      const id = await data.idToken;
      localStorage.setItem("id", data.idToken);
      localStorage.setItem("islogin", "true");
      localStorage.setItem("mailid", obj.email);
      dispatch(AuthsliceAction.Login(id));
    } catch (error) {}
  };
};
