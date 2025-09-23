import React, { useContext } from "react";
import styles from "./Header.module.css";
import { GoSearch } from "react-icons/go";
import LowerHeader from "./LowerHeader";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../utitlity/fireBase";



const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      dispatch({
        type: "SET_USER",
        user: null, // clear user from context
      });
      navigate("/auth"); // redirect to login
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const totalItem = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={styles.fixed}>
      <header className={styles.header}>
        {/* Left Section */}
        <div className={styles.headerLeft}>
          <Link to="/">
            <img
              className={styles.headerLogo}
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon_logo"
            />
          </Link>
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
            <GoSearch />
          </button>
        </div>

        {/* Right Section */}
        <div className={styles.headerRight}>
          <div className={styles.headerLanguage}>
            <img src="https://flagcdn.com/w20/nl.png" alt="Netherlands flag" />
            <select>
              <option value="en">NL</option>
            </select>
          </div>

          <div className={styles.headerOption}>
            {user ? (
              <div onClick={handleLogout} style={{ cursor: "pointer" }}>
                <span className={styles.optionLineOne}>
                  Hello {user?.email.split("@")[0]}
                </span>
                <span className={styles.optionLineTwo}>Sign Out</span>
              </div>
            ) : (
              <Link to="/auth">
                <span className={styles.optionLineOne}>Hello, Sign in</span>
                <span className={styles.optionLineTwo}>Account & Lists</span>
              </Link>
            )}
          </div>

          <div className={styles.headerOption}>
            <Link to="/orders">
              <span className={styles.optionLineOne}>Returns</span>
              <span className={styles.optionLineTwo}>& Orders</span>
            </Link>
          </div>

          <div className={styles.headerCart}>
            <div>
              <Link to="/cart">🛒</Link>
              <span>{totalItem}</span>
            </div>
            <span className={styles.optionLineTwo}>Cart</span>
          </div>
        </div>
      </header>
      <LowerHeader />
    </section>
  );
};

export default Header;
