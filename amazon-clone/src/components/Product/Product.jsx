import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import styles from './Product.module.css';
import Loader from "../Loader/Loader";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // default to true

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // show loader before fetching
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log("Data:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // hide loader after fetch
      }
    }
    fetchData();
  }, []);
    
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.productContainer}>
          {products.map((singleProduct) => (
            <ProductCard product={singleProduct} key={singleProduct.id} />
          ))}
        </section>
      )}
    </>
  );
};

export default Product;
