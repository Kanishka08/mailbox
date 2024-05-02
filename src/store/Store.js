import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth";
import Uislice from "./Ui";

const Store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    uiauth: Uislice.reducer,
  },
});
export default Store;
