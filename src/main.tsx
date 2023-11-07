import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./css/reset.css";
import "./css/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { MovieProvider } from "./context/MovieContext.tsx";
import "semantic-ui-css/semantic.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
