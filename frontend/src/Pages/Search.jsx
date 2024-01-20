/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import TopAnime from "../components/TopAnime";
import Fav from "../components/Fav";
import useAuthContext from "../hooks/useAuthContext";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SkeletonCard from "../components/SkeletonCard";
import Card from "../components/Card";
import Skelton from "../components/Skelton";
import { debounce } from "lodash";
import useScroll from "../hooks/useScroll";
const Search = () => {
  const [scroll] = useScroll()
  const [max, setMax] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);
  let search = searchParams.get("q");
  const [result, setResult] = useState([]);
  const array = "123456789111".split("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/search/?query=${search}&page=${page}`
      );
      const json = await response.json();
      if (response.ok&&json.list.length>0) {
        if(page>=json.maxPage){
          setMax(true)
        }else{
          setResult((prev) => [...prev,...json.list]);
          setMax(false)
          console.log(json);
        }
        setLoading(false);
      }else{
        return console.log(json)
      }    
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(async (searchTerm) => {
    console.log("Making API request with query:", searchTerm);
    await fetchData();
  }, 500);

  
  useEffect(()=>{
    if (!max) {
      setPage((prev) => prev + 1);
      console.log(page);
      setLoading(true); 
    } else {
      return;
    }
  },[scroll])



  useEffect(() => {
    const searchTerm = search || 'naruto'; // Memberikan nilai default jika search null atau undefined
    setResult([]);
    setPage(1);
    setLoading(true)
    debouncedSearch(searchTerm);
  }, [search]);
  
   useEffect(() => {
    (async () => {
      console.log(max);
      if (max) {
        return;
      }
      await fetchData();
    })();
  }, [page, max]);
  


  return (
    <div className="">
      <div className={` w-11/12 mx-auto`}>
        <div className="flex justify-center">
          <h1 className=" font-bold text-2xl mt-5">Search</h1>
        </div>
        <div className="flex flex-col items-end">
          <div
            className={`${
              load
                ? "grid grid-cols-3 gap-5 lg:gap-12 sm:grid-cols-4 md:grid-cols-5 auto-cols-fr grid-flow-row"
                : "grid grid-cols-3 gap-5 lg:gap-12 sm:grid-cols-4 md:grid-cols-5 auto-cols-fr grid-flow-row"
            }`}
          >
            {result &&
              result.map((e,index) => {
                return <Card data={e} key={index} />;
              })}
            {loading && array.map((e,i)=>{
              return <SkeletonCard key={e}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
