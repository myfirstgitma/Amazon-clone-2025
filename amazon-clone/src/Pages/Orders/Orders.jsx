import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./Orders.module.css";
import { db } from "../../utitlity/fireBase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          const fetchedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(), // Data is spread directly
          }));
          setOrders(fetchedOrders);
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && <div>You don't have orders yet</div>}

          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  <p>
                    Date:{" "}
                    {new Date(eachOrder.created * 1000).toLocaleDateString()}
                  </p>
                  <p>Total: ${(eachOrder.amount / 100).toFixed(2)}</p>

                  {/* Fixed: Remove .data since data is spread directly */}
                  {eachOrder?.basket?.map((order) => {
                    return (
                      <ProductCard
                        flex={true}
                        product={order}
                        key={order.id}
                        renderAdd={false}  
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;
