import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";
import Card from "../components/Card";
import { Header } from "../components/Header";

const FavPage = () => {
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

      setFav(json.fav);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.token, user.email]); // Memasukkan dependensi yang diperlukan

  return (
    <div className="w-full flex flex-col items-center">
      <h1>My List</h1>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 auto-cols-fr grid-flow-row w-11/12">
        {fav &&
          fav.map((e) => {
            return <Card data={e} key={e.mal_id} />;
          })}
      </div>
    </div>
  );
};

export default FavPage;
