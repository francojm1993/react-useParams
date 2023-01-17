import React from "react";

/** Este componente se usa cada vez que se recargue la página mientras se buscan los datos del usuario en el servidor   **/
//Importamos el archivo CSS:
import "../../css/accesorios/ModalLoadingPage.css";

//Importamos el loader:
import Loader from "./Loader";
const ModalLoadingPage = () => {
  return (
    <div className="ModalLoadingPage">
      <Loader />
    </div>
  );
};

export default ModalLoadingPage;
