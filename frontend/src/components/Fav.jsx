import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Card from "./Card";
const Fav = () => {
    const { user } = useAuthContext();
  const [fav, setFav] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/user/fav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          command: "get",
          data: [],
          email: user.email,
        }),
      });

      const json = await response.json();

      setFav(json.fav.slice(0,6));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.token, user.email]); // Memasukkan dependensi yang diperlukan

  return (
    <div className={`${fav.length?'block':'hidden'} w-11/12 mx-auto justify-center`}>
        <div className="flex justify-center">

        <h1 className=" font-bold text-2xl mt-5">My List</h1>
        </div>
        <div className="flex flex-col items-end">
        <h1 className="mx-5 my-2 underline font-medium"><Link to='/fav'>View All</Link></h1>
        </div>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 auto-cols-fr grid-flow-row">
        {fav&&fav.map(e=>{
           return <Card data={e} key={e.mal_id}/>
        })}
        
      </div>
    </div>
  );
};

export default Fav;
