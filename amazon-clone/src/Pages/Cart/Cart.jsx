import React, { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

const Cart = () => {
  const [{ basket, user }] = useContext(DataContext);

  // Calculate subtotal considering quantity (amount) of each item
  const total = basket?.reduce((amount, item) => {
    return amount + (item.price * (item.amount || 1));
  }, 0);

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
              <ProductCard
                key={item.id || i} // Use item.id if available, fallback to index
                product={item}
                renderDesc={true}
                renderAdd={false}
                flex={true}
              />
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