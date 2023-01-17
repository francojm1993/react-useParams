import React from "react";
import { Link } from "react-router-dom";

//Importamos el archivo CSS de este componente:
import "../../css/accesorios/ProductoCard.css";

//Acá empieza el componente:
const ProductoCard = ({ p }) => {
  return (
    <div key={p.product_id} className="producto">
      <h5 className="p-name">{p.product_name}</h5>
      <p className="p-brand">{p.product_brand}</p>
      <p className="p-price"> {`$ ${p.product_price}`} </p>

      <Link to={`/productos/${p.product_id}`} className="btn btn-info mb-3">
        Ver producto
      </Link>
    </div>
  );
};

export default ProductoCard;
