import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { image, title, id, rating, price } = product;

  return (
    <div className={styles.card}>
      <Link to={`/products/${id}`} className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        
        {/* ✅ only render rating if it exists */}
        {rating ? (
          <div className={styles.rating}>
            <Rating value={rating.rate} precision={0.1} readOnly />
            <small>{rating.count}</small>
          </div>
        ) : (
          <small>No rating available</small>
        )}

        <div className={styles.price}>
          <CurrencyFormat amount={price} />
        </div>
        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
