import { useState } from "react";
import { useLazySearchContentQuery } from "../redux/apiSlice";
import { Search } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../../utils/constant";

export default function SearchPage() {
  const [searchContent, { isLoading, error }] = useLazySearchContentQuery();
  const [contentType, setContentType] = useState("movie");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleQueryChange = (e) => setQuery(e.target.value);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }

    try {
      console.log("Starting search with query:", query);
      const res = await searchContent({ query, contentType }).unwrap();
      console.log("Search results:", res.content);
      setSearchResults(res.content);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl mb-8 font-bold text-center">
          Search{" "}
          {contentType === "person"
            ? "People"
            : contentType === "movie"
            ? "Movies"
            : "TV Shows"}
        </h1>

        <form className="flex gap-2 items-center justify-center mb-8" onSubmit={handleSearch}>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={handleQueryChange}
            placeholder={`Search for ${
              contentType === "person" ? "people" : contentType
            }`}
            className="w-full max-w-lg p-2 rounded bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded flex items-center"
          >
            <Search className="mr-2" />
            Search
          </button>
        </form>

        <div className="flex justify-center gap-3 mb-8">
          <button
            className={`py-2 px-4 rounded ${
              contentType === "movie" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => setContentType("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              contentType === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => setContentType("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              contentType === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => setContentType("person")}
          >
            Person
          </button>
        </div>

        {isLoading && <p className="text-center text-white">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">
            Error: {error.message || "An unexpected error occurred"}
          </p>
        )}
        {searchResults.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl mb-4 font-semibold text-center">
              Search Results for "{query}"
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 p-4 rounded cursor-pointer"
                  onClick={() => navigate(`/watch/${contentType}/${item.id}`)}
                >
                  {contentType === "person" ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={`${SMALL_IMG_BASE_URL + item.profile_path}`}
                        alt={item.name}
                        className="max-h-96 rounded mx-auto"
                      />
                      <h2 className="mt-2 text-xl font-bold">{item.name}</h2>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={`${SMALL_IMG_BASE_URL + item.poster_path}`}
                        alt={item.title || item.name}
                        className="w-full h-auto rounded"
                      />
                      <h3 className="mt-2 text-lg font-semibold">
                        {item.title || item.name}
                      </h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
