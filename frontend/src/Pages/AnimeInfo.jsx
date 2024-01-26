import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utils";
const AnimeInfo = () => {
  const { slug } = useParams();
  const [data, setData] = useState("");
  const [eps, setEps] = useState([]);
  const [Ecchi, setEcchi] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/anime/${slug}`);
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          setData(json.data);
          setEps(json.data.episode_lists);
          // eps.splice(0, json.currentTotalEpisodes);
          // if (json.genres.includes("Ecchi")) {
          //   setEcchi(true);
          // } else {
          //   setEcchi(false);
          // }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div>
      {/* {Ecchi && (
        <div>
          <h1 className=" text-3xl h-screen">Opps Anime ini tidak tersedia</h1>
        </div>
      )} */}
      <div>
        {!data && (
          <div className="">
            <div className="skeleton w-44 aspect-square"></div>
          </div>
        )}
        {data && !Ecchi && (
          <div className="flex flex-col items-center lg:items-start w-full mt-10 lg:-mt-10">
            <div className="lg:grid grid-cols-4 grid-flow-row auto-cols-fr lg:gap-10 gap-2 flex-col flex items-center">
              {" "}
              <img
                src={data && data.poster}
                alt="anime Img"
                className="w-40 lg:m-10 lg:w-56  rounded row-span-3 row-start-1"
              />
              <div className="lg:mt-16 mt-8 text-center lg:text-start col-start-2 row-start-1 col-span-3 lg:pr-10 mx-5 flex-col flex">
                <h1 className="text-2xl mb-3">{data.title}</h1>
                <div className="flex gap-3 mt-3">
                  {data.genres.map((e, index) => (
                    <button key={`${e}-${index}`} className="">
                      <Link
                        className="border-aksen border rounded-lg p-2 w-fit text-xs hover:bg-aksen"
                        to={`/genre/${e.slug}`}
                      >
                        {e.name}
                      </Link>
                    </button>
                  ))}
                </div>
              </div>
              <div className=" col-start-2 row-start-1 "></div>
              <ul className="flex gap-3 flex-col w-10/12 pb-8 mx-5 box-content col-span-2 col-start-2 row-start-2">
                <li>Type : {data.type}</li>
                <li>Rating : {data.rating}</li>
                <li>Status : {data.status}</li>
                <li>Current Total Episode : {data.episode_lists.length}</li>
              </ul>
              <Link
                to={
                  data.status === "Ongoing"
                    ? `/anime/eps/${
                        data.episode_lists[data.episode_lists.length - 1].slug
                      }`
                    : `/anime/eps/${data.episode_lists[0]}`
                }
                className="btn btn-active btn-neutral  row-start-3 col-start-2  w-44 border-aksen bg-aksen lg:row-start-2 lg:col-start-3"
              >
                {" "}
                <button className=" text-neutral-50">Tonton Sekarang</button>
              </Link>
              <div className=" row-start-4  col-span-4 px-10 ">
                <h1 className=" font-semibold text-lg pb-5">Synopsis</h1>
                <p className=" pb-10">{data.synopsis}</p>
              </div>
            </div>

            <h1 className=" text-2xl font-bold  mx-10  mb-5">All Episodes</h1>

            <div className="flex flex-col lg:flex-row flex-wrap lg:p-10 gap-3 ">
              {eps &&
                eps.map((e,i) => {
                  return (
                    <Link to={`/anime/eps/${e.slug}`} key={e.slug}>
                    <div
                      className=" w-80 bg-base-100 p-5 border lg:w-40 rounded-lg hover:text-aksen "
                      
                    >
                      <h1 className="hover:text-aksen max-w-full">
                 
                          {`${e.episode
                            .split(" ")
                            .find((word) => word.includes("Episode"))} ${i+1}`}
                      </h1>
                    </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeInfo;
