import React from 'react';
import useFetch from '../../hooks/useFetch';
import Carousel from '../../components/Carousel';
import ContentWrapper from '../../components/ContentWrapper';

function Recommendation({ mediaType, id }) {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <ContentWrapper>
      {data?.results.length > 0 && (
        <Carousel title="Recommendations" data={data?.results} endpoint={mediaType} />
      )}
    </ContentWrapper>
  );
}

export default Recommendation;
