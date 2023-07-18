import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import SwitchTabs from "../../components/SwitchTabs";
import Carousel from "../../components/Carousel";

function Trending() {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="mt-5 relative mb-16 md:mx-14 ml-14 mr-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Trending</h2>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
}

export default Trending;
