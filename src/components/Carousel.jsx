import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Img from "./lazyLoadImage";
import dayjs from "dayjs";

import posterFallback from "../assets/no-poster.png";
import { useSelector } from "react-redux";

function Carousel({ data, loading, title, endpoint }) {
  const carouselContainer = useRef();

  const { url } = useSelector((state) => state.home);

  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 110)
        : container.scrollLeft + (container.offsetWidth + 110);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };
  return (
    <div className="mb-14 relative">
      {title && <div className="text-2xl font-semibold  mb-5">{title}</div>}
      <BsFillArrowLeftCircleFill
        className=" text-5xl text-white absolute top-[40%] cursor-pointer opacity-60 z-30 hidden md:block hover:opacity-100 left-8"
        onClick={() => navigation("left")}
      />
      <BsFillArrowRightCircleFill
        className="text-5xl text-white absolute top-[40%] cursor-pointer opacity-60 z-30 hidden md:block hover:opacity-100 right-8"
        onClick={() => navigation("right")}
      />
      <div className="flex gap-3 overflow-y-hidden " ref={carouselContainer}>
        {data?.map((item) => {
          const posterUrl = item.poster_path
            ? url.poster + item.poster_path
            : posterFallback;
          return (
            <div
              className=" rounded-md cursor-pointer"
              key={item.id}
              onClick={() =>
                navigate(`/${item.media_type || endpoint}/${item.id}`)
              }
            >
              <div className="w-[170px] md:w-[200px] flex flex-col gap-1">
                <Img src={posterUrl} />
                <div className="flex justify-between">
                  <div>
                    <span className="text-[#BE0811]">❤️ </span>
                    {item.vote_average.toFixed(1)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">
                  {truncate(item.title || item.name, 17)}
                </span>
                <span className="opacity-80">
                  {dayjs(item.release_date || item.first_air_date).format(
                    "MMM D, YYYY"
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
