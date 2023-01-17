import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//Importamos la URL:
import { URL_API } from "../utils/URL.js";
//Importamos el módulo para hacer peticiones fetch:
import { FetchApi } from "../helpers/FetchApi.jsx";

//Importamos el componente del context:
import { UserContext } from "../context/UserProvider.jsx";

const useLogin = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  // destructuramos las variables y funciones que nos provee el Context:
  const { logIn } = useContext(UserContext);

  //Declaramos el navigate(sirve para redireccionar a un usuario a una ruta específica)
  const navigate = useNavigate();

  /** FUNCIÓN HANDLECHANGE  **/
  //Función para actualizar el valor del state cada vez que se escriba en el formulario:
  const handleChange = (e) => {
    //destructuramos las propiedades del input target:
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /** FUNCIÓN HANDLE SUBMIT  **/
  const handleSubmitLogin = (e) => {
    setError("");
    e.preventDefault();
    //Validamos que el formulario no esté vacío:
    if (!form.mail.trim() || !form.password.trim()) {
      return setError("Ingrese credenciales");
    }
    //Enviamos la petición al servidor:
    setLoginLoading(true);
    FetchApi.Login(`${URL_API}/user/login`, form.mail, form.password).then(
      (res) => {
        setLoginLoading(false);
        if (res.status === 400 || res.status === 404) {
          return setError("mail/contraseña incorrecta");
        } else if (res.status === 500) {
          return setError("Error en servidor");
        } else if (res.status === 200) {
          setError("");
          //Aquí vamos a realizar otra petición al servidor para pedirle los datos datos del usuario:
          console.log(res);

          logIn(res.data.uid, res.data.token, res.data.refreshToken);
          //Si todo está bien redirigimos al usuario a la pantalla de inicio:
          navigate("/");
        }
      }
    );
  };
  return {
    form,
    error,
    loginLoading,
    handleChange,
    handleSubmitLogin,
  };
};

export default useLogin;
