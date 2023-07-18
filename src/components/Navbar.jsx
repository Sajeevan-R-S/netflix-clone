import React, { useEffect, useState } from "react";
import Header from "./Header";

import logo from "../assets/netflixLogo.png";
import { Link, useNavigate } from "react-router-dom";

import { FaSearch, FaUser } from "react-icons/fa";
import ContentWrapper from "./ContentWrapper";

function Navbar({ alt, showQuickFilter = true, showProfileIcon = true }) {
  const navigate = useNavigate();

  const [show, handleShow] = useState(false);
  const [query, setQuery] = useState("");

  const links = [
    { name: "Movies", link: "explore/movie" },
    { name: "TV Shows", link: "explore/tv" },
  ];

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      event.target.value = "";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <>
      <div
        className={`flex flex-col fixed top-0  justify-between w-screen z-50 `}
      >
        <div
          className={`flex w-screen px-8 sm:px-10 justify-between items-center ${
            show && "bg-black "
          } transition ease-in duration-500 z-50`}
        >
          <div className=" flex flex-1justify-start items-start md:flex-row md:items-center">
            <img
              onClick={() => navigate("/")}
              className="w-28 sm:w-32 object-contain cursor-pointer"
              src={logo}
              alt={alt}
            />
            {/* {showQuickFilter && (
              <div className="">
                <ul className="flex gap-3 mx-0 sm:mx-10 overflow-x-scroll">
                  {links.map(({ name, link }) => {
                    return (
                      <li
                        key={name}
                      >
                        <Link to={link}>{name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )} */}
          </div>
          <div className="flex gap-4 flex-2 justify-center items-center">
            <div>
              <input
                type="text"
                placeholder="Search"
                onKeyUp={searchQueryHandler}
                onChange={handleInputChange}
                className="border w-28 md:w-[200px] border-white border-opacity-70 hover:border-opacity-100 px-2 py-1 bg-black bg-opacity-50 placeholder-white text-white rounded-lg "
              />
            </div>
            {showProfileIcon && (
              <div
                onClick={() => navigate("/profile")}
                className="bg-[#E50914] text-black w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
              >
                <FaUser className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
        {!show && showQuickFilter && (
          <div className="self-end">
            <ul className="flex gap-6 mx-8 sm:mx-10 overflow-x-scroll">
              {links.map(({ name, link }) => {
                return (
                  <li
                    className="text-white cursor-pointer border bg-white bg-opacity-20 hover:bg-[#BE0811] px-2 py-1 rounded-md "
                    key={name}
                  >
                    <Link to={link}>{name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
