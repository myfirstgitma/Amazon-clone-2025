import React, { useContext, useState } from "react";
import styles from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../utitlity/fireBase";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setcardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const totalItem = basket.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce((sum, item) => item.price * item.amount + sum, 0);

  const handleChange = (e) => {
    e.error?.message ? setcardError(e.error.message) : setcardError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    //   //step 1-backend functions
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      console.log(response.data);

      /******** client conformation *********/
      const clientSecret = response.data?.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent);
      // //push data base on firebase
      await db
        .collection("users")
        .doc(user?.uid) //row
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      //empty basket
    dispatch({ type: "EMPTY_BASKET" });


      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  // const handlePayment = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setprocessing(true);
  //     const response = await axiosInstance({
  //       method: "POST",
  //       url: `payment/create?total=${total * 100}`, // convert dollars to cents
  //     });
  //     console.log(response.data)
  //      const clientSecret = response.data?.clientSecret;
  //   }
  //   // catch (error) {
  //   //   console.log("Backend error:", error);
  //   //   setprocessing(false);
  //   //   return;
  //   // }

  //   // let paymentIntent;

  //     const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     });

  //     if (result.error) {
  //       setcardError(result.error.message);
  //       setprocessing(false);
  //       return;
  //     }

  //     paymentIntent = result.paymentIntent;
  //   } catch (err) {
  //     console.log("Stripe error:", err);
  //     setprocessing(false);
  //     return;
  //   }

  //   try {
  //     await db
  //       .collection("users")
  //       .doc(user.uid)
  //       .collection("orders")
  //       .doc(paymentIntent.id)
  //       .set({
  //         basket: basket,
  //         amount: paymentIntent.amount,
  //         created: paymentIntent.created,
  //       });
  //empty the basket

  //   } catch (dbError) {
  //     console.log("Database error:", dbError);
  //     setprocessing(false);
  //     return;
  //   }

  //   setprocessing(false);
  //   console.log("Navigating to orders...");
  //   navigate("/orders", { state: { msg: "you have placed new order" } });
  // };

  return (
    <>
      <div>
        <div className={styles.payment_header}>Check ({totalItem}) Items</div>
      </div>

      <section className={styles.payment}>
        <div className={styles.flex}>
          <div>
            <h3>Delivery Address</h3>
          </div>
          <div>
            <div>test@gmail.com</div>
            <div>Van Rijn Straat</div>
            <div>Rotterdam, NL</div>
          </div>
        </div>

        <hr />

        <div>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        <div className={styles.flex}>
          <h3>Payment methods</h3>
          <div className={styles.paymetn_card_container}>
            <form onSubmit={handlePayment}>
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}
              <CardElement onChange={handleChange} />

              <div className={styles.container}>
                <div className={styles.total}>
                  Total Order | <CurrencyFormat amount={total} />
                </div>
                <button type="submit" className={styles.payButton}>
                  {processing ? (
                    <div className="classes.loading">
                      <ClipLoader color="grey" size={12} />
                      <p>please wait ...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
