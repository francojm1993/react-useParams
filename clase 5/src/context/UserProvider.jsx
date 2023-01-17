//Lo vamos a necesitar para crear el context:
import { createContext, useState, useEffect } from "react";

import { FetchApi } from "../helpers/FetchApi";
import { URL_API } from "../utils/URL";

//Importamos el manejador de las cookies:
import { cookieManager, MAXAGETOKEN } from "../helpers/cookieManager";

//Declaramos el contexto(afuera del componente):
const UserContext = createContext();

const UserProvider = (props) => {
  //Declaramos el state que contendrá la info del user:
  const [user, setUser] = useState(undefined);
  //State del token de sesión:
  const [token, setToken] = useState("");
  //State del loading (para cada vez que se recargue la web)
  const [loadingModal, setLoadingModal] = useState(false);

  /**    Función para pedir los datos del usuario en el servidor (logueandolo)  **/
  function logIn(id, token, refreshToken = undefined) {
    setLoadingModal(true);
    FetchApi.getData(`${URL_API}/user/data/id/${id}`, token).then((res) => {
      //Una vez termina la petición sacamos el loading modal:
      setLoadingModal(false);
      if (res.status === 200) {
        //Establecemos la data del usuario:
        setUser(res.data);

        //Guardamos el token de sesión:
        setToken(token);
        if (refreshToken) {
          //Guardamos en las cookies el refreshToken:
          cookieManager.set("refreshToken", refreshToken, {
            maxAge: MAXAGETOKEN,
          });
        }
      }
    });
  }

  /** Función para desloguear al usuario  **/
  function logOut() {
    setUser(undefined);
    cookieManager.remove("refreshToken");
  }

  /**  USE EFFECT que se ejecuta cada vez que el usuario accede a la página  **/
  //Chequea si existe un token guardado en las cookies (lo que significa que está logueado en la página)
  useEffect(() => {
    const refreshToken = cookieManager.get("refreshToken");
    if (!refreshToken) return;
    //Si existe un token de sesión pedimos los datos al servidor:
    FetchApi.refreshLogin(`${URL_API}/user/session`, { refreshToken }).then(
      (res) => {
        if (res.status !== 200) {
          cookieManager.remove("refreshToken");
        } else {
          logIn(res.uid, res.token);
        }
      }
    );
  }, []);

  //Retornamos el "Provider" con todas las propiedades que vamos a usar de manera global
  return (
    <UserContext.Provider
      value={{ user, token, loadingModal, setUser, setToken, logIn, logOut }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

//Se debe exportar el contexto (así vamos a acceder a las propiedades en los otros componentes)
export { UserContext };

export default UserProvider;
