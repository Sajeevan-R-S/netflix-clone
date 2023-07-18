import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register";
import Login from "./pages/Login";
import Profile from "./pages/profile";
import WelcomeScreen from "./pages/WelcomeScreen";
import SearchResult from "./pages/SearchResult";
import { useDispatch, useSelector } from "react-redux";
import fetchDataFromApi from "./utils/api";
import { getApiConfiguration } from "./store/homeSlice";
import Details from "./pages/details/Details";
import Explore from "./pages/Explore";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase-config";
import { login, logout } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.home);
  console.log(url);

  const user = useSelector((state) => state.user.user);
  console.log("Logged User - App: ", user);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log("Api Config", res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profiles: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  useEffect(() => {
    fetchApiConfig();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          login({
            uid: currentUser.uid,
            accessToken: currentUser.accessToken,
            email: currentUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <WelcomeScreen />}></Route>
        <Route exact path="/signup/:email" element={<Register />}></Route>
        <Route exact path="/signup" element={<Register />}></Route>
        <Route exact path="/signin" element={<Login />}></Route>
        <Route exact path="/search/:query" element={<SearchResult />}></Route>
        <Route exact path="/:mediaType/:id" element={<Details />}></Route>
        <Route exact path="/explore/:mediaType" element={<Explore />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
