import React from 'react';
import { categoryData } from './categoryInfo';
import CategoryCard from './CategoryCard';
import styles from './Category.module.css'; // Import CSS module

const Category = () => {
  return (
    <div className={styles.categoryContainer}>
      <section className={styles.categorySection}>
        {categoryData.map((infos, index) => (
          <CategoryCard key={index} data={infos} />
        ))}
      </section>
    </div>
  );
};

export default Category;