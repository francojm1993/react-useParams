import React from "react";
import "../../css/ProductRoute/ProductInfo.css";
import defaultImage from "../../img/defaultImage.jpg";
import { URL_IMG } from "../../utils/URL";

const ProductInfo = ({ product }) => {
  return (
    <article className="productInfo">
      {/** CONTENEDOR IMAGEN: **/}
      <div className="container-img">
        {product.image_products.length !== 0 ? (
          <>
            <img
              src={`${URL_IMG}${product.image_products[0].ip_path}`}
              alt="product-img"
              className="img-product-info"
            />
          </>
        ) : (
          <>
            <img
              src={defaultImage}
              alt="product-img"
              className="img-product-info"
            />
          </>
        )}
      </div>
      <div className="container-data">
        <h1>{product.product_name}</h1>
        <h3>{product.product_brand}</h3>
        <p>
          <b>Stock: </b> {product.product_stock}
        </p>
        <p>
          <b>Estado: </b> {product.product_status}
        </p>
        <p>
          <b>Precio: </b>$ {product.product_price}
        </p>
      </div>
    </article>
  );
};

export default ProductInfo;
