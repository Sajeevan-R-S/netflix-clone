import React from "react";
import { useState, useEffect } from "react";
import { FaPlay, FaList } from "react-icons/fa";

import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import VideoPopup from "./VideoPopup";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function Banner() {
  const [background, setBackground] = useState("");
  const [movieDetails, setMovieDetails] = useState([]);

  const [showVideo, setshowVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");
  const { data: video, loading: videoLoading } = useFetch(
    `/movie/${movie}/videos`
  );

  console.log("Banner", movie);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * data?.results?.length);
    const bg = url.backdrop + data?.results?.[randomNumber]?.backdrop_path;
    setBackground(bg);
    setMovieDetails(data?.results?.[randomNumber]);
    setMovie(data?.results?.[randomNumber].id);
  }, [data]);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <header
      className=" flex flex-col justify-between relative h-[480px] md:h-[500px] lg:h-[600px] xl:h-[700px] text-white object-contain"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        ...(!loading && {
          backgroundImage: `url(${background})`,
        }),
        backgroundColor: "black",
      }}
    >
      <div className="flex flex-col ml-14 pt-28 md:pt-36 lg:pt-48 mb-6 gap-4 z-40 mt-6">
        <h1 className="text-5xl break-words max-w-[44rem] mr-6 font-bold">
          {movieDetails?.title ||
            movieDetails?.original_name ||
            movieDetails?.name}
        </h1>
        <h1 className=" w-80 md:w-[24rem] lg:w-[36rem] xl:w[44rem] pr-2 leading-7 text-base font-semibold">
          {truncate(movieDetails?.overview, 150)}
        </h1>
        <div className="flex gap-4">
          {video?.results?.[0].key && (
            <button
              onClick={() => {
                setshowVideo(true);
                setVideoId(video?.results?.[0].key);
              }}
              className="bg-[#e2e8f0] flex gap-2 items-center justify-center bg-opacity-60 hover:bg-white hover:text-black transition-all duration-200 px-4 py-1 text-base font-semibold rounded"
            >
              <FaPlay />
              Play Trailer
            </button>
          )}
          {video?.results?.[0].key && (
            <button
              onClick={() => navigate(`/movie/${movie}`)}
              className="bg-[#e2e8f0] flex gap-2 items-center justify-center bg-opacity-60 hover:bg-white hover:text-black transition-all duration-200 px-4 py-1 text-base font-semibold rounded"
            >
              More Details
            </button>
          )}
        </div>
      </div>
      <div className="absolute bg-gradient-to-r via-opacity-0 from-black w-screen h-full left-0"></div>
      <div className="absolute bg-gradient-to-t via-opacity-0 from-black z-5 w-screen h-1/5 bottom-0 left-0"></div>
      <VideoPopup
        show={showVideo}
        setShow={setshowVideo}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </header>
  );
}

export default Banner;
