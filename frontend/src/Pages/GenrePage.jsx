/* eslint-disable no-unused-vars */
import React, { useEffect, useState,lazy,Suspense } from "react";
import { useParams } from "react-router-dom";
import fetchApi from "../../action/fetchApi";
import useScroll from "../hooks/useScroll";
import SkeletonCard from "../components/SkeletonCard";
const CardPreview = lazy(() => import("../components/Card"));

const GenrePage = () => {
  const { genreSlug } = useParams();
  const [error, setError] = useState(false);
  const array = "123456".split("");
  const [scroll] = useScroll();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      setError(false);
      const res = await fetchApi(
        `http://localhost:3000/genre/${genreSlug}?page=${page}`
      );

      setData((prev) => [...prev, ...res.list]);
      console.log(data);
    } catch (error) {
      console.log(error);
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
      await getData();
    })();
  }, [page]);
  return (
    <div className={` w-11/12 mx-auto`}>
      <div className="flex justify-center">
        <h1 className=" font-bold text-2xl mt-5">Genre : {genreSlug}</h1>
      </div>
      <div className="flex flex-col items-end">
        <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 auto-cols-fr grid-flow-row h-auto w-full">
          {data &&
            data.map((e, index) => {
              return (
                <Suspense fallback={<SkeletonCard />} key={index}>
                  <CardPreview data={e} />
                </Suspense>
              );
            })}
          {!data.length &&
            array.map((e, index) => <SkeletonCard key={index} />)}

          {loading && array.map((e, index) => <SkeletonCard key={index} />)}

          {error && (
            <div
              role="alert"
              className="alert alert-error fixed top-0 w-full right-0 z-50"
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
