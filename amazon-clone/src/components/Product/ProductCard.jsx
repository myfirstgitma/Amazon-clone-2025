import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, flex }) => {
  const { image, title, id, rating, price, description } = product;

  return (
    <div className={`${flex ? styles.singleCard : styles.card}`}>
      {/* Two-column layout */}
      <div className={styles.leftColumn}>
        <Link to={`/products/${id}`}>
          <img src={image} alt={title} className={styles.image} />
        </Link>
      </div>

      <div className={styles.rightColumn}>
        <h3 className={styles.title}>{title}</h3>

        {flex && description && (
          <p className={styles.description}>{description}</p>
        )}

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
