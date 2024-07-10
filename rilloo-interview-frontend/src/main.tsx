import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/Auth.tsx";
import { RouterContextProvider } from "./context/Router.tsx";
import { TodoContextProvider } from "./context/TodoList.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodoContextProvider>
        <RouterContextProvider>
          <App />
        </RouterContextProvider>
      </TodoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
