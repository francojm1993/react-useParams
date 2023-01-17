import React, { useContext } from "react";

//Importamos las etiquetas "NavLink" de react-router-DOM que nos permite redirigir a la ruta indicada
import { NavLink } from "react-router-dom";

//Importamos el context para modificar el navbar en caso de que el usuario esté logueado:
import { UserContext } from "../../context/UserProvider";

const Navbar = () => {
  const { user, logOut, loadingPage } = useContext(UserContext);

  return (
    <>
      {!loadingPage && (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="productos"
                  >
                    Productos
                  </NavLink>
                </li>

                {/** ------ SECTOR DINÁMICO DEL NAVBAR ------ **/}

                {/* Si el usuario no está logueado le muestro "login o register"*/}
                {!user ? (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="register"
                      >
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="profile"
                      >
                        Profile
                      </NavLink>
                    </li>

                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        onClick={() => logOut()}
                        to="/"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </>
                )}
                {/** ------  FIN DE SECTOR DINÁMICO DEL NAVBAR ------ **/}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
