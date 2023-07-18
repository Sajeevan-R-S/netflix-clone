import React from 'react';
import useFetch from '../../hooks/useFetch';
import Carousel from '../../components/Carousel';
import ContentWrapper from '../../components/ContentWrapper';

function Similar({ mediaType, id }) {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === 'tv' ? 'Similar TV Shows' : 'Similar Movies';

  return (
    <ContentWrapper>
      {data?.results.length > 0 && (
        <Carousel title={title} data={data?.results} loading={loading} endpoint={mediaType} />
      )}
    </ContentWrapper>
  );
}

export default Similar;
