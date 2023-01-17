import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductRoute/ProductInfo";
import { FetchApi } from "../helpers/FetchApi";
import { URL_API } from "../utils/URL";

const ProductRoute = () => {
  //Obtenemos el param:
  const { id } = useParams();
  //States:
  const [product, setProduct] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Pedido de la data del producto:
    FetchApi.getData(`${URL_API}/product/list/${id}`).then((res) => {
      if (!res) return;
      if (res.status === 200) {
        console.log(res.data);
        setProduct(res.data);
      }
    });
  }, []);

  return <div>{product && <ProductInfo product={product} />}</div>;
};

export default ProductRoute;
