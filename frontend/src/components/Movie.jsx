/* eslint-disable no-unused-vars */
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import SkeletonCard from "./SkeletonCard";
const CardPreview = lazy(() => import("./Card"));
const Movie = (data) => {
  const [Movie, setMovie] = useState([]);
  const array = "123456".split("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/movie`);
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setLoading(false);
        setMovie(json.list);
        setError(false);
      }
      if (!response.ok) {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  };
  
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className={` w-full max-w-[90rem] mx-auto`}>
      <div className="flex justify-center">
        <h1 className=" font-bold text-2xl mt-5">Movie</h1>
      </div>
      <div className="flex flex-col items-end">
        <h1 className="mx-5 mb-2 underline font-medium">
          <Link to="/movie">View All</Link>
        </h1>
        <div className="grid grid-flow-col gap-5 lg:auto-cols-[10rem] md:auto-cols-[9rem] auto-cols-[7rem] px-5 md:px-8 lg:px-12 overflow-x-auto h-auto w-full no-scrollbar">
          {Movie &&
            Movie.map((e, index) => {
              return (
                <Suspense fallback={<SkeletonCard />} key={index}>
                  <CardPreview data={e} />
                </Suspense>
              );
            })}
          {!Movie.length &&
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

export default Movie;
