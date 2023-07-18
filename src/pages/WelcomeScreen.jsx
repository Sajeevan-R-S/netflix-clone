import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase-config";

import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import Button from "../components/Button";
import backgroundImage from "../assets/background.jpg";

function WelcomeScreen() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) navigate(`/signup/${email}`);
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
    <div className="relative">
      <div className="absolute bg-gradient-to-b from-black to-transparent  w-screen h-1/2 top-0 left-0"></div>

      <BackgroundImage image={backgroundImage} />
      <div className="absolute top-0 bottom-0 bg-black bg-opacity-40 h-screen w-screen flex flex-col z-50">
        <Header showButton={true} onclickSignIn={() => navigate("/signin")} />
        <div className="flex flex-col justify-center text-center gap-6 mb-6 mt-20 sm:mt-28 mx-4 ">
          <h1>Unlimited movies, TV shows and more</h1>
          <h4 className="text-xl font-bold">Watch anywhere. Cancel anytime.</h4>
          <h6 className="text-xl font-bold">
            Ready to watch? Enter your email to create or restart your
            membership
          </h6>
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-white bg-black bg-opacity-50 placeholder-white text-white font-medium text-lg p-4 w-[400px] rounded-lg "
            type="email"
            placeholder="Email Address"
            name="email"
          />
          <Button
            largeButton={true}
            label={"Get Started"}
            onclick={handleSubmit}
          />
        </div>
      </div>
      <div className="absolute bg-gradient-to-t from-black to-transparent w-screen h-1/2 bottom-0 left-0"></div>
    </div>
  );
}

export default WelcomeScreen;
