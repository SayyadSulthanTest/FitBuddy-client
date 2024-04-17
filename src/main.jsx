import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";

// import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientid = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// const clientid = process.env.VITE_GOOGLE_CLIENT_ID;
console.log(clientid);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <GoogleOAuthProvider clientid={clientid}>
        <App />
      </GoogleOAuthProvider> */}
      {/* <GoogleOAuthProvider clientid="79886345736-m9qkupb4jaqp34ukqkibtirsjot6u7tc.apps.googleusercontent.com"> */}
      <App />
      {/* </GoogleOAuthProvider> */}
    </Provider>
  </React.StrictMode>
);
