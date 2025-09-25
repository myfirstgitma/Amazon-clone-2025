import React, { useActionState, useContext, useState } from "react";
import styles from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { SliderMarkLabel } from "@mui/material/Slider";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";

const Payment = () => {
  const [{ user, basket }] = useContext(DataContext);

  // Calculate total number of items (for the header)
  const totalItem = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((total, item) => {
    return item.price * item.amount + total; // price × quantity
  }, 0);
  const [cardError, setcardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    console.log(e);
    e.error.message ? setcardError(e.error.message) : setcardError("");
  };

  return (
    <>
      <div>
        <div className={styles.payment_header}>Check ({totalItem}) Items</div>
      </div>

      <section className={styles.payment}>
        {/* payment method */}
        {/* address */}
        <div className={styles.flex}>
          <div>
            <h3>Delivery Adress</h3>
          </div>
          <div>
            <div>test@gmail.com</div>
            <div>Van Rijn Straat</div>
            <div>Rotterdam, NL</div>
          </div>
        </div>

        <hr />
        {/* product */}
        <div>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={styles.flex}>
          <h3>Payment methods</h3>
          <div className={styles.paymetn_card_container}>
            <div>
              <form action="">
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={styles.container}>
                  <div className={styles.total}>
                    Total Order | <CurrencyFormat amount={total} />
                  </div>
                  <button className={styles.payButton}>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </>
  );
};

export default Payment;
