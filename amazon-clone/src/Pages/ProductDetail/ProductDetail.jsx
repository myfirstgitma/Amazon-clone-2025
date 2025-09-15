import React, { useEffect, useState } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/Product/ProductCard';
import Loader from '../../components/Loader/Loader';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  }, [productId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ProductCard product={product} flex={true} renderAdd={true}/>
      )}
    </>
  );
};

export default ProductDetail;
