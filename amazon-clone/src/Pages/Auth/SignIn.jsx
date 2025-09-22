import React, { useState, useContext } from "react";
import styles from "./SignIn.module.css";
import { auth } from "../../utitlity/fireBase"; // ✅ fixed typo in 'utility'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {DataContext} from "../../components/DataProvider/DataProvider"

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [{user}, dispatch] = useContext(DataContext)
  

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const action = e.target.name;

    // ✅ Basic input validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      let userInfo;
      if (action === "signin") {
        userInfo = await signInWithEmailAndPassword(auth, email, password);
        dispatch({
          type: Type.SET_USER,
          user:user
        })
      } else if (action === "signup") {
        userInfo = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({
          type: Type.SET_USER,
          user: user,
        });
      }
      console.log(userInfo);
    } catch (error) {
      console.error(`${action} error:`, error);

      // ✅ Friendly error messages
      if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try signing in.");
      } else if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Incorrect email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <form className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />

        <button
          type="button"
          onClick={handleSignIn}
          name="signin"
          className={styles.button}
        >
          Sign In
        </button>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus,
          laboriosam beatae harum facilis ipsa fugiat nulla voluptate doloribus
          ex. Numquam quibusdam vel laboriosam libero doloribus dignissimos.
        </p>

        <button
          type="button"
          onClick={handleSignIn}
          name="signup"
          className={styles.button}
        >
          Create An Amazon Account
        </button>
      </form>
    </div>
  );
};

export default SignIn;
