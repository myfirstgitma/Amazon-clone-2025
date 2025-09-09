import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Left Section */}
      <div className="header__left">
        <a href="/">
          <img
            className="header__logo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="amazon_logo"
          />
        </a>
        <div className="header__location">
          <p className="header__optionLineOne">Delivered to</p>
          <span className="header__optionLineTwo">Netherlands</span>
        </div>
      </div>

      {/* Middle Section (Search bar) */}
      <div className="header__search">
        <select className="header__searchDropdown">
          <option value="all">All</option>
        </select>
        <input
          className="header__searchInput"
          type="text"
          placeholder="Search product"
        />
        <button className="header__searchIcon">🔍</button>
      </div>

      {/* Right Section */}
      <div className="header__right">
        <div className="header__language">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/1704274045/display_1500/stock-vector-netherlands-circle-button-flag-national-symbol-icon-vector-illustrarion-1704274045.jpg"
            alt="flag"
          />
          <select>
            <option value="en">NL</option>
          </select>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Hello, Sign in</span>
          <span className="header__optionLineTwo">Account & Lists</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        <div className="header__cart">
          🛒 <span className="header__optionLineTwo">Cart</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
