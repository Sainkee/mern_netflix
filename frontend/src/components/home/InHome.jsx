import React, { useState } from "react";
import { useTrendingQuery } from "../../redux/apiSlice";
import Navbar from "../layout/Navbar";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../../utils/constant";
import { Link } from "react-router-dom";
import ContentSlider from "../ContentSlider";
import { useSelector } from "react-redux";

export default function InHome() {
  const contentType = useSelector((state) => state.authenication.contentType);
  const user = useSelector((state) => state.authenication.user);
  console.log(user);

  const { data, isLoading } = useTrendingQuery(contentType);

  const trendingContent = data?.content;

  return (
    <>
      <div className="relative h-screen text-white  ">
        {!trendingContent && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
        )}

        <div className="max-w-7xl mx-auto">
          <Navbar />
        </div>

        {trendingContent && (
          <>
            <img
              src={ORIGINAL_IMG_BASE_URL + trendingContent.backdrop_path}
              alt="Hero img"
              className="absolute  top-0 left-0 w-full h-full object-cover -z-50"
            />
            <div
              className="absolute top-0 left-0 w-full h-full bg-black/50 -z-40"
              aria-hidden="true"
            />

            <div
              className="bg-gradient-to-b from-black via-transparent to-transparent 
          absolute w-full h-full top-0 left-0 -z-10"
            />

            <div className="max-w-7xl mx-auto">
              <div className=" max-w-2xl     p-4  mt-20 text-start sm:text-left sm:mt-32">
                <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight">
                  {trendingContent.title || trendingContent.name}
                </h1>
                <p className="mt-2 text-lg">
                  {trendingContent.release_date?.split("-")[0] ||
                    trendingContent.first_air_date?.split("-")[0]}{" "}
                  | {trendingContent.adult ? "18+" : "PG-13"}
                </p>

                <p className="mt-4 text-lg">
                  {trendingContent.overview.length > 200
                    ? trendingContent.overview.slice(0, 200) + "..."
                    : trendingContent.overview}
                </p>

                <div className="mt-6">
                  <Link
                    to={`/watch/${contentType}/${trendingContent.id}`}
                    className=" px-6 py-3 bg-red-600 text-white rounded shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
                  >
                    Watch Now
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col  gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <ContentSlider
                key={category}
                category={category}
                contentType={contentType}
              />
            ))
          : TV_CATEGORIES.map((category) => (
              <ContentSlider
                key={category}
                category={category}
                contentType={contentType}
              />
            ))}
      </div>
    </>
  );
}
