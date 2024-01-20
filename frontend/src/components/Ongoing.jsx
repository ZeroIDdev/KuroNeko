/* eslint-disable no-unused-vars */
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import SkeletonCard from "./SkeletonCard";
import useScroll from "../hooks/useScroll";
const CardPreview = lazy(() => import("./Card"));
const Ongoing = (data) => {
  const [scroll] = useScroll();
  const [Ongoing, setOngoing] = useState([]);
  const array = "123456".split("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/home`);
      const json = await response.json();
      console.log(json);
      if (!error && response.ok) {
        setLoading(false);
        setOngoing(json.list);
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
    <div className={` w-11/12 mx-auto`}>
      <div className="flex justify-center">
        <h1 className=" font-bold text-2xl mt-5">New Update</h1>
      </div>
      <div className="flex flex-col items-end">
        <h1 className="mx-5 my-2 underline font-medium">
          <Link to="/Ongoing">View All</Link>
        </h1>
        <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 auto-cols-fr grid-flow-row h-auto w-full">
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
    </div>
  );
};

export default Ongoing;
