//Importamos el archivo CSS de esta ruta:
import "../css/RegisterRoute/RegisterRoute.css";

//Importamos el hook personalizado con las funciones necesarias para registrar usuarios:
import useRegister from "../hooks/useRegister";

//Importamos el componente Loader de carga:
import Loader from "../components/accesorios/Loader";
import FormRegister from "../components/RegisterRoute/FormRegister";

//Definimos los valores iniciales del formulario:
const initialState = { username: "", mail: "", password: "" };

const RegisterRoute = () => {
  //Destructuramos las funciones y states que brinda el hook:
  const { form, handleChange, handleSubmit, msg, loading, errors } =
    useRegister(initialState);
  return (
    <div>
      <h1>Register</h1>

      {/** FORMULARIO DE REGISTRO **/}
      <FormRegister
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />

      {/** LOADER DE CARGA  **/}
      {loading && <Loader />}

      {/**  MENSAJE DEL SERVIDOR  **/}
      {msg && (
        <div className="container-msg">
          <p className="msg-p">{msg} </p>
        </div>
      )}
    </div>
  );
};

export default RegisterRoute;
