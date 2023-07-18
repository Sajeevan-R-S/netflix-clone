import React from "react";
import ReactPlayer from "react-player/youtube";

function VideoPopup({ show, setShow, videoId, setVideoId }) {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  return (
    <div>
      {show && (
        <div
          className="flex flex-col justify-center items-center w-full h-full cursor-pointer top-0 left-0 fixed z-50"
          onClick={hidePopup}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="flex flex-col relative w-[450px] md:w-[600px] lg:w-[800px] aspect-video transition-transform scale-100 duration-250">
            <div className="self-end mb-1" onClick={hidePopup}>
              Close
            </div>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls
              width="100%"
              height={"100%"}
              playing={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPopup;
