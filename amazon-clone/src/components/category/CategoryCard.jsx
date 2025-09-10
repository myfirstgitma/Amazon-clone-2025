import React from "react";

import styles from "./Category.module.css"; // Import your CSS module

const CategoryCard = ({ data }) => {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryContent}>
        <h2 className={styles.categoryTitle}>{data.title}</h2>
        <div className={styles.categoryImageContainer}>
          <img
            src={data.img}
            alt={data.title}
            className={styles.categoryImage}
          />
        </div>

        <a href="#" className={styles.categoryShopLink}>
          shop now
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;
