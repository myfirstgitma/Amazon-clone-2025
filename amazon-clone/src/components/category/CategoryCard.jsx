import React from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";

const CategoryCard = ({ data }) => {
  return (
    <Link to={`/category/${data.name}`} className={styles.categoryCard}>
      <div className={styles.categoryContent}>
        <h2 className={styles.categoryTitle}>{data.title}</h2>
        <div className={styles.categoryImageContainer}>
          <img
            src={data.img}
            alt={data.title}
            className={styles.categoryImage}
          />
        </div>
        <span className={styles.categoryShopLink}>Shop Now</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
