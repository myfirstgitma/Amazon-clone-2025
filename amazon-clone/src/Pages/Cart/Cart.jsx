import React, { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { Type } from '../../utitlity/action.type';

const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Calculate subtotal considering quantity (amount) of each item
  const total = basket?.reduce((amount, item) => {
    return amount + (item.price * (item.amount || 1));
  }, 0);

  const increament = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: item
    });
  };

  const decreament = (item) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id: item.id
    });
  };

  // Calculate total number of items considering quantities
  const totalItems = basket?.reduce((count, item) => {
    return count + (item.amount || 1);
  }, 0);

  return (
    <>
      <section className={styles.cartContainer}>
        <div className={styles.basket}>
          <h2>Hello {user ? user.email : "Guest"}</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
         

{basket.length === 0 ? (
  <p>No items found</p>
) : (
  basket.map((item, i) => (
    <section key={item.id || i} className={styles.cartItem}>
      <div className={styles.productDetails}>
        <ProductCard
          product={item}
          renderDesc={true}
          renderAdd={false}
          flex={true}
        />
      </div>
      <div className={styles.itemActions}>
        <div className={styles.quantityControls}>
          <button 
            className={styles.quantityBtn}
            onClick={() => decreament(item)}
            disabled={item.amount <= 1}
          >
            −
          </button>
          <span className={styles.quantityDisplay}>
            {item.amount}
          </span>
          <button 
            className={styles.quantityBtn}
            onClick={() => increament(item)}
          >
            +
          </button>
        </div>
      </div>
    </section>
  ))
)}
        </div>

        {basket?.length !== 0 && (
          <div className={styles.paymentBox}>
            <p>
              Subtotal ({totalItems} item
              {totalItems > 1 ? "s" : ""}):{" "}
              <strong>
                <CurrencyFormat amount={total} />
              </strong>
            </p>
            <span className={styles.giftOption}>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments" className={styles.checkoutBtn}>
              Continue to checkout
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;