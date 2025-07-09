import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchTopHeadlines, filterNews, searchNews } from "../redux/newsSlice";
import Card from "../components/Cards";
import Navbar from "../components/Navbar";

export default function FrontPage() {
  const dispatch = useDispatch();
  const { articles, loading, page, hasMore, isSearchOrFilter } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    dispatch(fetchTopHeadlines(1)); // Initial load
  }, [dispatch]);

  const fetchMoreData = () => {
    if (hasMore && !isSearchOrFilter) {
      dispatch(fetchTopHeadlines(page + 1));
    }
  };

  const handleSearch = (query) => {
    dispatch(searchNews(query));
  };

  const handleFilter = (category) => {
    dispatch(filterNews(category));
  };

  return (
    <>
      <Navbar onSearch={handleSearch} onFilter={handleFilter} />
      <div className="bg-white dark:bg-[#666363] min-h-screen text-black dark:text-white p-6 transition-colors duration-300">
        {loading && articles.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} loading={true} />
            ))}
          </div>
        ) : (
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={!isSearchOrFilter && hasMore}
            loader={<h4 className="text-center mt-4">Loading more news...</h4>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <Card key={i} article={article} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
}
