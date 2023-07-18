import React, { useState } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import Img from '../../components/lazyLoadImage';
import { FaPlay } from 'react-icons/fa';
import VideoPopup from '../../components/VideoPopup';

function VideoSection({ data }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  };

  return (
    <div className="relative mb-5">
      <ContentWrapper>
        <div className="text-2xl font-semibold my-5">Official Videos</div>
        <div className="flex gap-3 overflow-x-auto -mr-5 -ml-5 px-5">
          {data?.results?.map((video) => (
            <div
              className="w-[150px] flex-shrink-0 cursor-pointer"
              key={video.id}
              onClick={() => {
                setVideoId(video.key);
                setShow(true);
              }}
            >
              <div className="mb-4 relative flex justify-center items-center">
                <Img
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                />
                <div className="bg-black opacity-50 rounded w-full h-full absolute"></div>
                <FaPlay className=" absolute w-10 border rounded-full p-2 h-10" />
              </div>
              <div className="text-sm">{truncate(video.name, 35)}</div>
            </div>
          ))}
        </div>
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
}

export default VideoSection;
