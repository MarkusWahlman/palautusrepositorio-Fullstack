import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer
        newestOnTop={false}
        closeOnClick
        autoClose={2000}
        pauseOnFocusLoss={false}
        style={{
          position: "static",
          marginTop: "20px",
          maxWidth: "400px",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
