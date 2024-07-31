import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetDetailQuery,
  useGetSimilarQuery,
  useGetTrailerQuery,
} from "../redux/apiSlice";
import Navbar from "../components/layout/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  formatReleaseDate,
  ORIGINAL_IMG_BASE_URL,
  SMALL_IMG_BASE_URL,
} from "../../utils/constant";
import { useSelector } from "react-redux";

export default function DynamicPage() {
  const { contentType } = useSelector((state) => state.authenication);

  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [details, setDetails] = useState(null);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const { data: trailerData } = useGetTrailerQuery({ contentType, id });
  const { data: similarData } = useGetSimilarQuery({ contentType, id });
  const { data: detailData } = useGetDetailQuery({ contentType, id });
  const sliderRef = useRef(null);

  useEffect(() => {
    if (trailerData) setTrailers(trailerData.content ?? []);
  }, [trailerData]);

  useEffect(() => {
    if (similarData) setSimilars(similarData.content ?? []);
  }, [similarData]);

  useEffect(() => {
    if (detailData) setDetails(detailData.content ?? []);
  }, [detailData]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (!trailers) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      {details?.backdrop_path && (
        <>
          <div className="absolute inset-0 w-full h-full bg-black bg-opacity-70 -z-10" />
          <img
            src={ORIGINAL_IMG_BASE_URL + details.backdrop_path}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover blur-md -z-20"
          />
        </>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4 px-4 max-w-7xl mx-auto">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="p-2">
          {trailers.length > 0 && (
            <iframe
              className="w-full mx-auto h-[300px] sm:h-[450px] md:h-[600px] lg:h-[450px] xl:h-[550px]"
              frameBorder="0"
              src={`https://www.youtube.com/embed/${trailers[currentTrailerIdx].key}`}
              title="YouTube video player"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          )}

          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {details?.title || details?.name}
              </span>{" "}
              😥
            </h2>
          )}
        </div>

        {/* Movie details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-20 max-w-6xl mx-auto mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">
              {details?.title || details?.name}
            </h2>
            <p className="mt-2 text-base md:text-lg">
              {formatReleaseDate(
                details?.release_date || details?.first_air_date
              )}{" "}
              |{" "}
              {details?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-base md:text-lg">{details?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + details?.poster_path}
            alt="Poster"
            className="w-full max-w-xs md:max-w-md h-auto rounded-md"
          />
        </div>

        {similars.length > 0 && (
          <div className="mt-12 max-w-6xl mx-auto relative">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Similar Movies/TV Shows</h3>

            <div
              className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similars.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${contentType}/${content.id}`}
                    className="w-36 md:w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-sm md:text-lg font-semibold">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}
            </div>

            <ChevronRight
              className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
              onClick={scrollRight}
            />
            <ChevronLeft
              className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
              onClick={scrollLeft}
            />
          </div>
        )}
      </div>
    </div>
  );
}
