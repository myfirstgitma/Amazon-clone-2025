import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../utitlity/action.type";

const ProductCard = ({ product, flex }) => {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);
  console.log(state);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

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

        <button className={styles.button} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
