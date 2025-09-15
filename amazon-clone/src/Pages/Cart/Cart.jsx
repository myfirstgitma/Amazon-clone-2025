import React, { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

const Cart = () => {
  const [{ basket, user }] = useContext(DataContext);

  // calculate subtotal
  const total = basket?.reduce((amount, item) => amount + item.price, 0);

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
                key={i}
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
              Subtotal ({basket?.length} item
              {basket?.length > 1 ? "s" : ""}):{" "}
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
