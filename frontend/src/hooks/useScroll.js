/* eslint-disable no-unused-vars */
import { useState,useEffect } from "react";
const useScroll = () => {
    const [ga,setga] = useState(1)
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
        setga(prev=>prev+1)
    }
  };
  
  return [ga]
};

export default useScroll;
