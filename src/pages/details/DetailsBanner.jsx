import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import ContentWrapper from '../../components/ContentWrapper';
import Img from '../../components/lazyLoadImage';
import PosterFallback from '../../assets/no-poster.png';
import dayjs from 'dayjs';
import { FaPlay } from 'react-icons/fa';
import VideoPopup from '../../components/VideoPopup';

function DetailsBanner({ video, crew }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const director = crew?.filter((f) => f.job === 'Director');
  const writer = crew?.filter(
    (f) => f.job === 'Screenplay' || f.job === 'Story' || f.job === 'Writer'
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };

  return (
    <header
      className="flex flex-col justify-between relative h-full text-white object-contain"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        ...(!loading && {
          backgroundImage: `url(${url.backdrop + data?.backdrop_path})`,
        }),
        backgroundColor: 'black',
      }}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 w-screen h-full bg-black opacity-80"></div>
      <ContentWrapper>
        <div className="mt-[150px] lg:mt-[130px]">
          <div>
            <div className="text-4xl font-medium">{`${data?.name || data?.title} (${dayjs(
              data?.release_date
            ).format('YYYY')})`}</div>
            <div className="font-semibold opacity-60 text-xl mt-1 mb-4">{data?.tagline}</div>
          </div>
          <div className="flex gap-10 mb-4">
            <div className="w-[350px] lg:w-[350px] self-start lg:self-start ">
              {data?.poster_path ? (
                <Img src={url.backdrop + data?.poster_path} />
              ) : (
                <Img src={PosterFallback} />
              )}
            </div>
            <div className="flex flex-col gap-6 self-start  lg:self-start">
              <div>
                <div className="text-2xl mb-3">
                  <span className="text-[#BE0811]">❤️ </span>
                  {data?.vote_average.toFixed(1)}
                </div>
                <div className="flex gap-4 mb-6 max-w-[2000px] flex-wrap">
                  {data?.genres.map(({ id, name }) => (
                    <div className="bg-[#BE0811] px-2 rounded" key={id}>
                      {name}
                    </div>
                  ))}
                </div>
                {video?.key && (
                  <div
                    className="flex gap-2 text-xl items-center cursor-pointer inline"
                    onClick={() => {
                      setShowVideo(true);
                      setVideoId(video.key);
                    }}
                  >
                    <div className="border rounded-full">
                      <FaPlay className="m-2" />
                    </div>
                    <span className="text-lg">Watch Trailer</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
                {data?.status && (
                  <div>
                    <div className="font-semibold opacity-60">Status: </div>
                    <div className="text-lg font-semibold">{data?.status}</div>
                  </div>
                )}
                {data?.release_date && (
                  <div>
                    <div className="font-semibold opacity-60">Release Date: </div>
                    <div className="text-lg font-semibold">
                      {dayjs(data.release_date).format('MMM D, YYYY')}
                    </div>
                  </div>
                )}
                {data?.runtime && (
                  <div>
                    <div className="font-semibold opacity-60">Runtime: </div>
                    <div className="text-lg font-semibold">
                      {toHoursAndMinutes(data.runtime)}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                {director?.length > 0 && (
                  <div className="hidden lg:block">
                    <div className="font-semibold opacity-60">Director: </div>
                    {director?.map((d, i) => (
                      <div key={i} className="text-lg font-semibold">
                        {d.name}
                        {director?.length - 1 !== i && ', '}
                      </div>
                    ))}
                  </div>
                )}
                {writer?.length > 0 && (
                  <div className="hidden lg:block">
                    <div className="font-semibold opacity-60">Writer: </div>
                    {writer?.map((d, i) => (
                      <div key={i} className="text-lg font-semibold">
                        {d.name}
                        {writer?.length - 1 !== i && ', '}
                      </div>
                    ))}
                  </div>
                )}
                {data?.created_by?.length > 0 && (
                  <div className="hidden lg:block">
                    <div className="font-semibold opacity-60">Creator: </div>
                    {data?.created_by?.map((d, i) => (
                      <div key={i} className="text-lg font-semibold">
                        {d.name}
                        {data?.created_by?.length - 1 !== i && ', '}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden lg:block w-full">
                <div className="text-3xl mb-2 font-semibold">Overview</div>
                <div className="text-lg max-w-[620px]">{data?.overview}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-4">
              <div className="lg:hidden">
                <div className="text-3xl mb-2 font-semibold">Overview</div>
                <div className="text-lg lg:text-justify">{data?.overview}</div>
              </div>
              {director?.length > 0 && (
                <div className="block lg:hidden">
                  <span>Director: </span>
                  {director?.map((d, i) => (
                    <span key={i} className="text-lg font-semibold">
                      {d.name}
                      {director?.length - 1 !== i && ', '}
                    </span>
                  ))}
                </div>
              )}
              {writer?.length > 0 && (
                <div className="block lg:hidden">
                  <span>Writer: </span>
                  {writer?.map((d, i) => (
                    <span key={i} className="text-lg font-semibold">
                      {d.name}
                      {writer?.length - 1 !== i && ', '}
                    </span>
                  ))}
                </div>
              )}
              {data?.created_by?.length > 0 && (
                <div className="block lg:hidden">
                  <span>Creator: </span>
                  {data?.created_by?.map((d, i) => (
                    <span key={i} className="text-lg font-semibold">
                      {d.name}
                      {data?.created_by?.length - 1 !== i && ', '}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </ContentWrapper>
      <div className="absolute bg-gradient-to-t via-opacity-0 from-black z-5 w-screen h-1/5 bottom-0 left-0"></div>
      <VideoPopup
        show={showVideo}
        setShow={setShowVideo}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </header>
  );
}

export default DetailsBanner;
