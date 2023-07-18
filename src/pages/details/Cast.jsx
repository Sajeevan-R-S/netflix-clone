import React from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import { useSelector } from 'react-redux';
import avatar from '../../assets/avatar.png';
import Img from '../../components/lazyLoadImage';

function Cast({ data, loading }) {
  const { url } = useSelector((state) => state.home);

  return (
    <div className="mt-5">
      <ContentWrapper>
        <div className="text-2xl font-semibold mb-5">Top Cast</div>
        <div className="flex gap-5 overflow-y-hidden -mx-5 px-5">
          {data?.map((item) => {
            const imgUrl = item.profile_path
              ? url?.profiles + item.profile_path
              : avatar;

            return (
              <div key={item.id} className="text-center">
                <div className="w-[170px] overflow-hidden rounded-full h-[170px] mb-6 flex flex-col justify-center">
                  <Img src={imgUrl} alt={item.name} />
                </div>
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-sm font-semibold opacity-70">
                  {item.character}
                </div>
              </div>
            );
          })}
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Cast;
