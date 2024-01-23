/* eslint-disable no-unused-vars */
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import SkeletonCard from "./SkeletonCard";
import useScroll from "../hooks/useScroll";
import { api } from "../utils";
const CardPreview = lazy(() => import("./Card"));
const TopAnime = (data) => {
  const [scroll] = useScroll();
  const [Home, setHome] = useState([]);
  const array = "123456".split("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [max,setMax] = useState(false)
  const fetchData = async () => {
    try {
      if (!max) {
      const response = await fetch(`${api}/ongoing-anime/${page}`);
      const json = await response.json();
      if (!error && response.ok) {
        if (json.pagination.has_next_page===false) setMax(true)
        setLoading(false);
        setHome((prev) => [...prev, ...json.data]);
        setError(false);
      }
      if (!response.ok) {
        setError(true);
      }}
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  };
  useEffect(() => {
    setPage(1);
  }, []);
  useEffect(() => {
    (async () => {
      setPage((prev) => prev + 1);
    })();
  }, [scroll]);

  useEffect(() => {
    (async () => {
      if (max) {
        return
      }
      setLoading(true);
      await fetchData();
    })();
  }, [page]);
  return (
    <div className={` w-11/12 mx-auto`}>
      <div className="flex justify-center">
        <h1 className=" font-bold text-2xl mt-5">Ongoing</h1>
      </div>
      <div className="flex flex-col items-end">
        <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 auto-cols-fr grid-flow-row h-auto w-full">
          {Home &&
            Home.map((e, index) => {
              return (
                <Suspense fallback={<SkeletonCard />} key={index}>
                  <CardPreview data={e} />
                </Suspense>
              );
            })}
          {!Home.length &&
            array.map((e, index) => <SkeletonCard key={index} />)}

          {loading &&
            array.map((e, index) => <SkeletonCard key={index} />)}

          {error && (
            <div
              role="alert"
              className="alert alert-error fixed top-0 w-full right-0 z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! Task failed successfully.</span>{" "}
              <button
                className="btn btn-active btn-neutral"
                onClick={fetchData}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopAnime;
