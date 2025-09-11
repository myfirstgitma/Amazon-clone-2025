import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import styles from './Product.module.css';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log("Data:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
    
  return (
    <section className={styles.productContainer}>
      {products.map((singleProduct) => (
        <ProductCard product={singleProduct} key={singleProduct.id} />
      ))}
    </section>
  );
};

export default Product;