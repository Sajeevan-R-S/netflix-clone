import React from 'react';

import Navbar from '../../components/Navbar';
import Banner from '../../components/Banner';
import Trending from './Trending';
import TopRated from './TopRated';
import Popular from './Popular';

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Trending />
      <TopRated />
      <Popular />
    </>
  );
}

export default Home;
