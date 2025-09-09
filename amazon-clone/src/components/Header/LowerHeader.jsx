import React from "react";
import { IoMdMenu } from "react-icons/io";
import styles from "./LowerHeader.module.css";

const LowerHeader = () => {
  return (
    <nav className={styles.lowerHeader}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <IoMdMenu size={20} />
          <p>All</p>
        </li>
        <li className={styles.navItem}>Today's Deals</li>
        <li className={styles.navItem}>Customer Service</li>
        <li className={styles.navItem}>Registry</li>
        <li className={styles.navItem}>Gift Cards</li>
        <li className={styles.navItem}>Sell</li>
      </ul>
    </nav>
  );
};

export default LowerHeader;
