import React from 'react';
import { categoryData } from './categoryInfo';
import CategoryCard from './CategoryCard';

const Category = () => {
  return (
    <div className="category-container">
      <section className="category-section">
        {categoryData.map((infos, index) => (
          <CategoryCard key={index} data={infos} />
        ))}
      </section>
    </div>
  );
};

export default Category;
