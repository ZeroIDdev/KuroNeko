/* eslint-disable react/prop-types */
import useFavStore from "../hooks/useFavStore";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
export default function Card({ data, scroll }) {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  // const addData = async (data) => {

  //   try {
  //     console.log(user);
  //     const response = await fetch("http://localhost:4000/api/user/fav", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({
  //         command: "add",
  //         data: data.data,
  //         email: user.email,
  //       }),
  //     });

  //     const json = await response.json();

  //     console.log(json);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const favS = async (id) => {
  //   try {
  //     const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  //     const json = await response.json();

  //     if (response.ok) {
  //       await addData(json);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div
      className={`h-max b-red-50 mx-auto  flex-shrink-0 snap-center w-full flex flex-col justify-start items-end group`}
      onClick={() =>
        navigate(`/${data.type == "Movie" ? "movie" : "anime"}/${data.slug}`)
      }
    >
      <div className="bg-[#029EFF] w-12 h-6 relative top-[1.5rem] rounded-tr lg:rounded-tr-md rounded-bl-xl z-20 text-center text-xs flex items-center justify-center gap-1">
        {data.release_day|| (()=> {
       
       return (
       
       <h1 className="flex items-center gap-1"><FaStar/> {data.rating}</h1>)
        })()}
      </div>
      <div className="overflow-hidden rounded lg:rounded-md hover:shadow-[0px_-57px_124px_-88px_rgba(0,0,0,1)_inset] hover:brightness-50 h-5/6 w-full">
      <img
        className="rounded w-full bg-cover hover:scale-125 transition-all lg:rounded-md h-max  aspect-[3/4]  hover:rotate-6 bg-base-300"
        src={data.poster}
        alt={data.slug}
        loading="lazy"
      />
      </div>
     
      <div className="w-full">
        <div className="bg-[#029EFF] w-fit h-6 relative bottom-[1.5rem] rounded-bl rounded-tr-xl lg:rounded-bl-md text-start text-xs font-normal flex items-center gap-1 px-2">
          {data.current_episode||`Episode ${data.episode_count}`}
        </div>
      </div>
      {/* <h3
        className="relative -top-10 bg-blue-600 p-2 w-20 h-10 inline rounded-lg text-md font-bold cursor-pointer"
        onClick={handleClick}
      >
        add Fav
      </h3> */}
      <div className="-mt-4 w-full overflow-hidden flex flex-col justify-start items-start">
        <h5
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2, 
          }}
          className="md:text-lg md:font-semibold tracking-tight  text-xs font-semibold relative left-0 w-full group-hover:text-aksen"
        >
          {data.title}
        </h5>
      </div>
    </div>
  );
}
