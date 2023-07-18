import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import posterFallback from "../assets/no-poster.png";
import dayjs from "dayjs";
import Img from "./lazyLoadImage";

function MovieCard({ data, fromSearch, mediaType }) {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : posterFallback;

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div>
        <div className="w-[170px] md:w-[200px]">
          <Img src={posterUrl} />
        </div>
        <div className="flex flex-col mb-4 mt-1">
          <span className="font-medium">
            {truncate(data.title || data.name, 17)}
          </span>
          <span className="opacity-80">
            {dayjs(data.release_date || data.first_air_date).format(
              "MMM D, YYYY"
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
