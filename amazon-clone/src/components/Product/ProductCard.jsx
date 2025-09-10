import React from 'react';
import Rating from "@mui/material/Rating";
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import styles from './Product.module.css';


const ProductCard = ({ product }) => {
  // eslint-disable-next-line no-unused-vars
  const { image, title, id, rating, price } = product;

  return (
    <div className={styles.card}>
      <a href="" className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </a>
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rating}>
          <Rating value={rating.rate} precision={0.1} readOnly />
          <small>{rating.count}</small>
        </div>
        <div className={styles.price}>
          <CurrencyFormat amount={price} />
        </div>
        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
