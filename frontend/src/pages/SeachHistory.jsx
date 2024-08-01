import Navbar from "../components/layout/Navbar";
import {
  useGetSearchHistoryQuery,
  useDeleteSearchHistoryMutation,
} from "../redux/apiSlice";

import { SMALL_IMG_BASE_URL } from "../../utils/constant";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";

function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}
export const SearchHistory = () => {
  const {
    data: searchedHistory,
    error,
    isLoading,
  } = useGetSearchHistoryQuery();
  const [deleteSearchHistory] = useDeleteSearchHistoryMutation();

  const handleDelete = async (id) => {
    try {
      await deleteSearchHistory(id).unwrap();
      toast.success("Search item deleted");
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  console.log(searchedHistory);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white">
        <div className="max-w-[90%] mx-auto">
          <Navbar />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">Failed to load search history</p>
          </div>
        </div>
      </div>
    );
  }

  if (searchedHistory.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <div className=" max-w-[90%] mx-auto">
          <Navbar />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchedHistory.length > 0 &&
            searchedHistory.map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-800 p-4 rounded flex items-start"
              >
                <img
                  src={SMALL_IMG_BASE_URL + entry.image}
                  alt="History image"
                  className="size-16 rounded-full object-cover mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-white text-lg">{entry.title}</span>
                  <span className="text-gray-400 text-sm">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                <span
                  className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                    entry.searchType === "movie"
                      ? "bg-red-600"
                      : entry.searchType === "tv"
                      ? "bg-blue-600"
                      : "bg-green-600"
                  }`}
                >
                  {entry.searchType[0].toUpperCase() +
                    entry.searchType.slice(1)}
                </span>
                <Trash
                  className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                  onClick={() => handleDelete(entry.id)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
