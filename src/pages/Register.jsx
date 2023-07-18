import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase-config";

import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import backgroundImage from "../assets/background.jpg";
import Button from "../components/Button";

function Register() {
  const { email } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: email,
    password: "",
  });

  const handleSignup = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("Sign up error: ", error.code, error.message);
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    const checkUserAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });

    return () => checkUserAuth(); // Cleanup function for useEffect
  }, [navigate]);

  return (
    <div>
      <BackgroundImage image={backgroundImage} />
      <div className="absolute top-0 bottom-0 bg-black bg-opacity-60 h-screen w-screen flex flex-col z-50">
        <Header onclickLogo={() => navigate("/")} showButton={false} />
        <div className="flex z-50 mx-auto my-auto flex-col items-center gap-6 w-[350px] sm:w-[450px] p-11 pb-32 rounded-xl bg-black bg-opacity-80">
          <h1 className="ml-1 self-start text-2xl font-bold">Sign Up</h1>
          <input
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
            className="bg-gray-500 rounded px-6 py-3 w-[300px] sm:w-[350px] placeholder-white mt-5"
            type="email"
            placeholder="Enter your email"
            name="email"
          />
          <input
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
            className="bg-white rounded px-6 py-3 w-[300px] sm:w-[350px] placeholder-black text-black"
            type="password"
            placeholder="Enter password"
            name="password"
          />
          <Button largeButton={true} label={"Sign Up"} onclick={handleSignup} />
          <p className="self-start ml-1">
            <span className="text-gray-400 font-semibold no-underline">
              Already have an account?
            </span>
            <span
              onClick={() => navigate("/signin")}
              className="text-white ml-1 font-semibold hover:underline cursor-pointer"
            >
              Sign In now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
