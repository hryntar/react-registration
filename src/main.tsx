import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <BrowserRouter basename="/react-registration">
         <AuthProvider>
            <Routes>
               <Route path="/*" element={<App />}></Route>
            </Routes>
         </AuthProvider>
      </BrowserRouter>
   </React.StrictMode>
);
