import React, { useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import styles from "./Results.module.css";
import Loader from "../../components/Loader/Loader"; // ✅ Import Loader

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Add loading state
  const { categoryName } = useParams();

  useEffect(() => {
    if (!categoryName) {
      console.log("No category name provided");
      setLoading(false);
      return;
    }

    setLoading(true); // ✅ Start loading
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setResults(res.data);
      })
      .catch((err) => {
        console.error("Error fetching results:", err);
      })
      .finally(() => {
        setLoading(false); // ✅ Stop loading
      });
  }, [categoryName]);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Results for: {categoryName}</h2>

        {loading ? (
          <Loader /> // ✅ Show loader while fetching
        ) : results.length === 0 ? (
          <p className={styles.empty}>No products found in this category.</p>
        ) : (
          <ul className={styles.list}>
            {results.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <h3>{item.title || item.name}</h3>
                <p>{item.description}</p>
                <span className={styles.price}>€{item.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Results;
