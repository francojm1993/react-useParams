import React from "react";
import "../../css/RegisterRoute/FormRegister.css";
const FormRegister = ({ handleSubmit, form, handleChange, errors }) => {
  return (
    <form className="form-register" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handleChange}
        value={form.username || ""}
      />

      {/*Validamos si hay un error en este input*/}
      {errors.username && <p className="validation-p">{errors.username} </p>}

      <input
        type="mail"
        name="mail"
        placeholder="mail"
        onChange={handleChange}
        value={form.mail || ""}
      />

      {/*Validamos si hay un error en este input*/}
      {errors.mail && <p className="validation-p">{errors.mail} </p>}

      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
        value={form.password || ""}
      />

      {/*Validamos si hay un error en este input*/}
      {errors.password && <p className="validation-p">{errors.password} </p>}

      <button>Submit</button>
    </form>
  );
};

export default FormRegister;
