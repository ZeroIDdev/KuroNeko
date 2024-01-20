/* eslint-disable no-unused-vars */
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import SkeletonCard from "../components/SkeletonCard";
import useScroll from "../hooks/useScroll";
const CardPreview = lazy(() => import("../components/Card"));
const CompletePage = (data) => {
  const [scroll] = useScroll();
  const [Home, setHome] = useState([]);
  const array = "123456".split("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/completed/?page=${page}`);
      const json = await response.json();
      console.log(json);
      if (!error && response.ok) {
        setLoading(false);
        setHome((prev) => [...prev, ...json.list]);
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
      setLoading(true);
      await fetchData();
    })();
  }, [page]);
  return (
    <div className={` w-11/12 mx-auto`}>
      <div className="flex justify-center">
        <h1 className=" font-bold text-2xl mt-5">Completed</h1>
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
            <div>
             <h1>Opss Something Went Error X﹏X</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletePage;
