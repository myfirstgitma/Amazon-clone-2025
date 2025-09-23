import React, { useState, useContext, useEffect } from "react";
import styles from "./SignIn.module.css";
import { auth } from "../../utitlity/fireBase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { useNavigate, useLocation } from "react-router-dom";

import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../utitlity/action.type"; // Import Type from action.type file

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Debug: Log component mount and user state changes
  useEffect(() => {
    console.log("🔍 SignIn component mounted");
    console.log("📍 Current location:", location.pathname);
    console.log("👤 Current user in context:", user);
  }, []);

  useEffect(() => {
    console.log("👤 User state changed:", user);
    // If user is already signed in, redirect immediately
    if (user) {
      console.log("✅ User is signed in, attempting redirect");
      navigate("/");
    }
  }, [user, navigate]);

  const testNavigation = () => {
    console.log("🧪 Testing navigation...");
    try {
      navigate("/");
      console.log("✅ Test navigation successful");
    } catch (error) {
      console.error(" Test navigation failed:", error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    const action = e.target.name;

    console.log(" Starting authentication:", action);
    console.log(" Email:", email);
    console.log(" Password length:", password.length);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading((prev) => ({
      ...prev,
      signIn: action === "signin",
      signUp: action === "signup",
    }));

    try {
      let userInfo;

      console.log(" Attempting Firebase authentication...");

      if (action === "signin") {
        userInfo = await signInWithEmailAndPassword(auth, email, password);
      } else if (action === "signup") {
        userInfo = await createUserWithEmailAndPassword(auth, email, password);
      }

      console.log(" Firebase auth successful:", {
        uid: userInfo?.user?.uid,
        email: userInfo?.user?.email,
      });

      if (userInfo?.user) {
        console.log(" Dispatching to context...");

        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });

        console.log(" Context dispatch completed");
 
        navigate("/");

        

        // Method 3: Force reload as last resort
        setTimeout(() => {
          console.log(" Force reload attempt");
          window.location.href = "/";
        }, 1000);
      } else {
        console.error(" No user data received");
        setError("Authentication succeeded but no user data received");
      }
    } catch (error) {
      console.error(" Authentication error:", error);
      console.error(" Error code:", error.code);
      console.error(" Error message:", error.message);

      // Handle specific Firebase auth errors
      switch (error.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/email-already-in-use":
          setError("This email is already registered. Try signing in.");
          break;
        case "auth/invalid-credential":
        case "auth/wrong-password":
          setError("Incorrect email or password.");
          break;
        case "auth/user-not-found":
          setError("No account found with this email. Try signing up.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError(`Authentication failed: ${error.message}`);
      }
    } finally {
      console.log(" Resetting loading states");
      setLoading({ signIn: false, signUp: false });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>

      {/* DEBUG SECTION - Remove in production */}
      <div
        style={{
          background: "#f0f0f0",
          padding: "10px",
          margin: "10px 0",
          fontSize: "12px",
        }}
      >
        
        <br />
         
        {/* <br />
        User in Context: {user ? `${user.email} (${user.uid})` : "None"}
        <br /> */}
        <button onClick={testNavigation} style={{ margin: "5px 0" }}>
     
        </button>
        <button
          onClick={() =>
            console.log("Context:", { user }, "Navigate:", navigate)
          }
        >
           
        </button>
      </div>

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
          disabled={loading.signIn || loading.signUp}
        >
          {loading.signIn ? <ClipLoader size={15} color="#000" /> : "Sign In"}
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
          disabled={loading.signIn || loading.signUp}
        >
          {loading.signUp ? (
            <ClipLoader size={15} color="#000" />
          ) : (
            "Create An Amazon Account"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
