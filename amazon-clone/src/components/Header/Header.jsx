import React from "react";
import styles from "./Header.module.css";
import { GoSearch } from "react-icons/go";
import LowerHeader from "./LowerHeader";

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Left Section */}
      <div className={styles.headerLeft}>
        <a href="/">
          <img
            className={styles.headerLogo}
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="amazon_logo"
          />
        </a>
        <div className={styles.headerLocation}>
          <p className={styles.optionLineOne}>Delivered to</p>
          <span className={styles.optionLineTwo}>Netherlands</span>
        </div>
      </div>

      {/* Middle Section (Search bar) */}
      <div className={styles.headerSearch}>
        <select className={styles.headerSearchDropdown}>
          <option value="all">All</option>
        </select>
        <input
          className={styles.headerSearchInput}
          type="text"
          placeholder="Search product"
        />
        <button className={styles.headerSearchIcon}>
          {" "}
          <GoSearch />{" "}
        </button>
      </div>

      {/* Right Section */}
      <div className={styles.headerRight}>
        <div className={styles.headerLanguage}>
          <img
            src="https://www.shutterstock.com/shutterstock/photos/1704274045/display_1500/stock-vector-netherlands-circle-button-flag-national-symbol-icon-vector-illustrarion-1704274045.jpg"
            alt="flag"
          />
          <select>
            <option value="en">EN</option>
          </select>
        </div>

        <div className={styles.headerOption}>
          <span className={styles.optionLineOne}>Hello, Sign in</span>
          <span className={styles.optionLineTwo}>Account & Lists</span>
        </div>

        <div className={styles.headerOption}>
          <span className={styles.optionLineOne}>Returns</span>
          <span className={styles.optionLineTwo}>& Orders</span>
        </div>

        <div className={styles.headerCart}>
          <div>
            <a href="/">🛒</a>
            <span>0</span>
          </div>

          <span className={styles.optionLineTwo}>Cart</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
