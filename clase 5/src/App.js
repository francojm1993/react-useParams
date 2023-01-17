import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/accesorios/Navbar";
import Footer from "./components/accesorios/Footer";

//Importamos el context:
import { UserContext } from "./context/UserProvider";
import { useContext } from "react";
import ModalLoadingPage from "./components/accesorios/ModalLoadingPage";

function App() {
  const { loadingModal } = useContext(UserContext);
  return (
    <div className="App">
      {/* Colocamos el modal */}
      {loadingModal && <ModalLoadingPage />}

      {/* Colocamos el navbar arriba */}
      <Navbar />

      {/*Colocamos el contenido dinamico de las rutas en el medio */}
      {/** Permite visualizar las sub-rutas que están dentro de esta ruta  **/}
      <section className="app-section">
        <Outlet />
      </section>

      {/* Abajo colocamos el footer de la página */}
      <Footer />
    </div>
  );
}

export default App;
