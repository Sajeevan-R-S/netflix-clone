import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Navbar from '../../components/Navbar';
import DetailsBanner from './DetailsBanner';
import Cast from './Cast';
import VideoSection from './VideoSection';
import Recommendation from './Recommendation';
import Similar from './Similar';

function Details() {
  const { mediaType, id } = useParams();

  const { data: videoData, loading: videoLoading } = useFetch(
    `/${mediaType}/${id}/videos`
  );

  const { data: creditsData, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <Navbar />
      <DetailsBanner video={videoData?.results?.[0]} crew={creditsData?.crew} />
      <Cast data={creditsData?.cast} loading={creditsLoading} />
      <VideoSection data={videoData} loading={videoLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
}

export default Details;
