import { useState } from "react";

//Importamos la URL de la API para hacer las peticiones:
import { URL_API } from "../utils/URL";
//Importamos la instancia de Fetch para poder manejar peticiones al servidor:
import { FetchApi } from "../helpers/FetchApi";

/**  HOOK PERSONALIZADO:  **/
//Recibe como parámetro el state inicial:
const useRegister = (initialState) => {
  //State del formulario:
  const [form, setForm] = useState(initialState);
  //State de mensaje al registrar:
  const [msg, setMsg] = useState("");
  //State de un loading de carga:
  const [loading, setLoading] = useState(false);

  //State de los errores de validación:
  const [errors, setErrors] = useState({});

  /**----------------------------------------------------------------------------------**/
  /**  FUNCIÓN PARA VALIDAR EL FORMULARIO **/
  function validarFormulario(form) {
    let errores = {};

    //Errores de username:
    if (!form.username.trim()) {
      errores.username = "ingrese username";
    } else if (form.username.trim().length < 3) {
      errores.username = "username corto";
    } else if (form.username.trim().length > 25) {
      errores.username = "username muy largo";
    }
    //Errores de mail:
    if (!form.mail.trim()) {
      errores.mail = "ingrese mail";
    }

    //Errores de password:
    if (!form.password.trim()) {
      errores.password = "ingrese password";
    } else if (form.password.trim().length < 6) {
      errores.password = "password corto";
    } else if (form.password.trim().length > 25) {
      errores.password = "password muy largo";
    }

    setErrors(errores);
    return errores;
  }

  /**--------------------------------------------------------------------------------------**/
  /**  HANDLE CHANGE  **/
  //Función para actualizar el valor del state cada vez que se escriba en el formulario:
  const handleChange = (e) => {
    //destructuramos las propiedades del input target:
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /**--------------------------------------------------------------------------------------**/

  /**  HANDLE SUBMIT  **/
  const handleSubmit = (e) => {
    setErrors({});
    e.preventDefault();

    //Validamos el formulario antes de enviarlo (con nuestra funcion para validar)
    const ErrorCheck = validarFormulario(form);
    if (Object.keys(ErrorCheck).length !== 0) return setErrors(ErrorCheck);

    //Activamos el loader y realizamos la petición:
    setLoading(true);
    FetchApi.postData(`${URL_API}/user/register`, form, "").then((res) => {
      //desactivamos el loader:
      setLoading(false);
      setMsg("");
      //si no hay respuesta:
      if (!res) return setMsg("ERROR REGISTRANDO");
      //Si la respuesta no es satisfactoria:
      else if (res.msg === "MAIL_IN_USE") return setMsg("mail en uso");
      else if (res.msg === "USERNAME_IN_USE") return setMsg("username en uso");
      else if (res.status === 201) {
        setForm(initialState);
        setMsg("REGISTRADO CON ÉXITO");
      }
    });
  };

  /** RETURNS  **/
  {
    /* Estos son los datos que brinda este hooks personalizado*/
  }
  return { form, handleChange, handleSubmit, msg, loading, errors };
};

export default useRegister;
