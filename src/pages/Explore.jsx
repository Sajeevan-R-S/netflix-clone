import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import useFetch from "../hooks/useFetch";
import ContentWrapper from "../components/ContentWrapper";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import fetchDataFromApi from "../utils/api";

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

function Explore() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);

  const { mediaType } = useParams();
  const { data: genresData, error: genresError } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    setError(null);
    const filters = {};
    if (sortby) {
      filters.sort_by = sortby.value;
    }
    if (genre) {
      const genreIds = genre.map((g) => g.id);
      filters.with_genres = genreIds.join(",");
    }
    fetchDataFromApi(`/discover/${mediaType}`, filters)
      .then((res) => {
        setData(res);
        setPageNum(1);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const fetchNextPageData = () => {
    const filters = {};
    if (sortby) {
      filters.sort_by = sortby.value;
    }
    if (genre) {
      const genreIds = genre.map((g) => g.id);
      filters.with_genres = genreIds.join(",");
    }
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum + 1}`, filters)
      .then((res) => {
        setData((prevData) => ({
          ...prevData,
          results: [...prevData.results, ...res.results],
        }));
        setPageNum((prev) => prev + 1);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (genresError) {
      setError(genresError.message);
    } else {
      setError(null);
    }
  }, [genresError]);

  useEffect(() => {
    fetchInitialData();
  }, [mediaType, sortby, genre]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
    }
    if (action.name === "genres") {
      setGenre(selectedItems);
    }
  };

  return (
    <>
      <Navbar showQuickFilter={false} />
      <div className="mt-[150px] min-h-[700px] flex justify-center items-center">
        <ContentWrapper>
          <div className="flex flex-col md:flex-row justify-between items-center mb-5">
            <div className="text-2xl font-semibold mb-5 md:ml-7 self-center md:self-start">
              {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
            </div>
            <div className="flex gap-3 flex-col md:flex-row min-w-[350px]">
              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: "grey",
                    backgroundColor: "black",
                  }),
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }),
                  input: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                  }),
                  multiValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    borderRadius: "10px",
                  }),
                  multiValueRemove: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    color: "black",
                    cursor: "pointer",
                  }),
                  multiValueLabel: (baseStyles) => ({
                    ...baseStyles,
                    color: "black",
                    fontWeight: "bold",
                  }),
                  menuList: (baseStyles) => ({
                    ...baseStyles,
                    color: "black",
                    fontWeight: "bold",
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    top: "40px",
                    margin: 0,
                    padding: 0,
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }),
                }}
                isMulti
                name="genres"
                value={genre}
                closeMenuOnSelect={false}
                options={genresData?.genres}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onChange={onChange}
                placeholder="Select genres"
                classNamePrefix="react-select"
              />
              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: "grey",
                    backgroundColor: "black",
                  }),
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }),
                  input: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                  }),
                  multiValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    borderRadius: "10px",
                  }),
                  multiValueRemove: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    color: "black",
                    cursor: "pointer",
                  }),
                  multiValueLabel: (baseStyles) => ({
                    ...baseStyles,
                    color: "black",
                    fontWeight: "bold",
                  }),
                  menuList: (baseStyles) => ({
                    ...baseStyles,
                    color: "black",
                    fontWeight: "bold",
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    top: "40px",
                    margin: 0,
                    padding: 0,
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }),
                }}
                name="sortby"
                value={sortby}
                options={sortbyData}
                onChange={onChange}
                isClearable={true}
                placeholder="Sort by"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          {loading && <Spinner />}
          {!loading && (
            <>
              {data?.results?.length > 0 ? (
                <InfiniteScroll
                  className="flex flex-wrap gap-5 mb-12 justify-center items-center"
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum < data?.total_pages}
                  loader={<Spinner />}
                >
                  {data?.results.map((item, index) => {
                    if (item.media_type === "person") return null;
                    return (
                      <div className="flex" key={index}>
                        <MovieCard
                          data={item}
                          fromSearch={true}
                          mediaType={mediaType}
                        />
                      </div>
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <div className="flex m-auto self-center justify-center items-center -mt-24">
                  <span className="text-2xl font-semibold">
                    Sorry, no results found!
                  </span>
                </div>
              )}
            </>
          )}
        </ContentWrapper>
      </div>
    </>
  );
}

export default Explore;
