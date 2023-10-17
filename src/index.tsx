import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SocketConnectionManager from "./context/SocketConnectionManager";
import UserManager from "./context/UserManager";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SocketConnectionManager>
      <UserManager>
        <App />
      </UserManager>
    </SocketConnectionManager>
  </React.StrictMode>
);
