import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//Importamos los módulos necesarios de React-Router-DOM:
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductosRoute from "./routes/ProductosRoute";
import RegisterRoute from "./routes/RegisterRoute";
import HomeRoute from "./routes/HomeRoute";
import ErrorRoute from "./routes/ErrorRoute";
import LoginRoute from "./routes/LoginRoute";
import UserProvider from "./context/UserProvider";
import ProfileRoute from "./routes/ProfileRoute";

//Este compomente va a filtrar la ruta.
//Si no está logueado el usuario impide su acceso.
import VerifyAccess from "./components/accesorios/VerifyAccess";
import ProductRoute from "./routes/ProductRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/*El Provider del user debe envolver todas las rutas */}
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomeRoute />} />
            <Route path="/productos" element={<ProductosRoute />} />

            {/* Definimos la ruta que va a recibir el param: */}
            <Route path="/productos/:id" element={<ProductRoute />} />
            <Route path="/register" element={<RegisterRoute />} />
            <Route path="login" element={<LoginRoute />} />
            <Route path="*" element={<ErrorRoute />} />
            <Route
              path="/profile"
              element={
                <VerifyAccess>
                  <ProfileRoute />
                </VerifyAccess>
              }
            />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
