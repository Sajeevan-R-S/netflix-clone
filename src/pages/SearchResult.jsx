import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchDataFromApi from "../utils/api";
import Spinner from "../components/Spinner";
import ContentWrapper from "../components/ContentWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

function SearchResult() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`);
      setData(res);
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.log("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPageData = async () => {
    try {
      const res = await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`);
      if (data?.results) {
        setData((prevData) => ({
          ...prevData,
          results: [...prevData.results, ...res.results],
        }));
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.log("Error fetching next page data:", error);
    }
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="mt-[150px] min-h-[700px] flex justify-center items-center">
        {loading ? (
          <Spinner />
        ) : (
          <ContentWrapper>
            {data?.results?.length > 0 ? (
              <>
                <div className="text-2xl font-semibold mb-5 ml-7">
                  {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
                </div>
                <InfiniteScroll
                  className="flex flex-wrap gap-5 mb-12 justify-center items-center"
                  dataLength={data?.results?.length || 0}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner />}
                >
                  {data?.results.map((item, index) => {
                    if (item.media_type === "person") return null;
                    return (
                      <div className="flex" key={index}>
                        <MovieCard data={item} fromSearch={true} />
                      </div>
                    );
                  })}
                </InfiniteScroll>
              </>
            ) : (
              <div className="flex m-auto self-center justify-center items-center -mt-24">
                <span className="text-2xl font-semibold">
                  Sorry, Results not found!
                </span>
              </div>
            )}
          </ContentWrapper>
        )}
      </div>
    </>
  );
}

export default SearchResult;
