import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import SwitchTabs from "../../components/SwitchTabs";
import Carousel from "../../components/Carousel";

function TopRated() {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="mt-8 relative mb-16 md:mx-14 ml-14 mr-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Top Rated</h2>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
}

export default TopRated;
