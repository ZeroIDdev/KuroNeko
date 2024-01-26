/* eslint-disable no-unused-vars */
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import SkeletonCard from "./SkeletonCard";
import useScroll from "../hooks/useScroll"
import { api } from "../utils";
const CardPreview = lazy(() => import("./Card"));
const Ongoing = (data) => {
  const [scroll] = useScroll();
  const [Ongoing, setOngoing] = useState([]);
  const [Complete, setComplete] = useState([]);
  const array = "123456".split("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${api}/home`);
      const json = await response.json();
      console.log(json);
      if (!error && response.ok) {
        setLoading(false);
        setOngoing(json.data.ongoing_anime);
        setComplete(json.data.complete_anime);
        setError(false);
      }
      if (!response.ok) {
        setError(true);
        setLoading(false);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);

      setError(true);
    }
  };
  
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className={` w-11/12 mx-auto red`}>
      <div className="flex justify-center">
        <h1 className=" font-bold text-2xl mt-5 ">New Update</h1>
      </div>
      <div className="flex flex-col items-end">
        <h1 className="mx-5 underline font-medium">
          <Link to="/Ongoing">View All</Link>
        </h1>
        <div className="grid grid-cols-3 gap-x-2 md:gap-x-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 auto-cols-fr grid-flow-row h-auto w-full">
          {Ongoing &&
            Ongoing.map((e, index) => {
              return (
                <Suspense fallback={<SkeletonCard />} key={index}>
                  <CardPreview data={e} />
                </Suspense>
              );
            })}
          {!Ongoing.length &&
            array.map((e, index) => <SkeletonCard key={index} />)}

          {loading &&
            array.map((e, index) => <SkeletonCard key={index} />)}

        
        </div>
      </div>
        {error && (
           <div className="text-center max-w-full"><h1>Error Please Refresh</h1></div>
          )}

<div className="flex justify-center">
        <h1 className=" font-bold text-2xl mt-5">Complete</h1>
      </div>
      <div className="flex flex-col items-end">
        <h1 className="mx-5 mb-2 underline font-medium">
          <Link to="/complete">View All</Link>
        </h1>
        <div className="grid grid-flow-col gap-x-2 md:gap-x-4 lg:auto-cols-[10rem] md:auto-cols-[9rem] auto-cols-[7rem] px-5 md:px-8 lg:px-12  overflow-x-auto h-auto w-full no-scrollbar">
          {Complete &&
            Complete.map((e, index) => {
              return (
                <Suspense fallback={<SkeletonCard />} key={index}>
                  <CardPreview data={e} />
                </Suspense>
              );
            })}
          {!Complete.length &&
            array.map((e, index) => <SkeletonCard key={index} />)}

          {loading &&
            array.map((e, index) => <SkeletonCard key={index} />)}

          {error && (
            <div
              role="alert"
              className="alert alert-error fixed top-0 w-full right-0 z-50"
            >
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ongoing;
