import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
const AnimeInfo = () => {
  const { slug } = useParams();
  const [data, setData] = useState("");
  const [eps, setEps] = useState([]);
  const [Ecchi,setEcchi] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/anime/${slug}`);
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          setData(json);
          for (let i = 0; i < json.currentTotalEpisodes; i++) {
            setEps((prev) => [...prev, i + 1]);
            console.log(eps);
          }
          eps.splice(0, json.currentTotalEpisodes);
          if (json.genres.includes('Ecchi')) {
            setEcchi(true)
          }else{
            setEcchi(false)
          }
          
         
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div>
      {
        Ecchi&&(<div>
          <h1 className=" text-3xl h-screen">Opps Anime ini tidak tersedia</h1>
        </div>)
      }
      <div>
        {!data&&!Ecchi&& (
          <div className="">
            <div className="skeleton w-44 aspect-square"></div>
          </div>
        )}
        {data&&!Ecchi && (
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="lg:grid grid-cols-4 grid-flow-row auto-cols-fr lg:gap-10 gap-2 flex-col flex items-center">
              {" "}
              <img
                src={data && data.poster}
                alt="anime Img"
                className="w-40 lg:m-10 lg:w-56  rounded mt-8 row-span-3"
              />
              <h1 className="text-2xl lg:mt-16 mt-8 text-center lg:text-start inline col-span-3 lg:pr-10 mx-5">
                {data.title}
              </h1>
              <ul className="flex gap-3 flex-col w-10/12 pb-8 mx-5 box-content col-span-2 col-start-2 row-start-2">
                <li>Type : Anime</li>
                <li>7.1</li>
                <li>Status : Ongoing</li>
              </ul>
              <button className="btn btn-active btn-neutral bg-base-100 row-start-3 col-start-2 "><Link to={data.detailsList[8].title === "Ongoing"?`/anime/eps/${data.slugPlayer}/${data.currentTotalEpisodes}`:`/anime/eps/${data.slugPlayer}/1}`}>Tonton Sekarang</Link></button>
              <div className=" row-start-4  col-span-4 px-10 ">
                <h1 className=" font-semibold text-lg pb-5">Deskripsi</h1>
               <p className=" pb-10">{data.description}</p> 
              </div>
            </div>

            <h1 className=" text-2xl font-bold  mx-10  mb-5">All Episodes</h1>

            <div className="flex flex-col lg:flex-row flex-wrap lg:p-10 ">
              {eps &&
                eps.map((e) => {
                  return (
                    <div
                      className=" w-80 bg-base-100 p-5 border lg:w-40"
                      key={e}
                    >
                      <h1 className=" max-w-full">
                        <Link to={`/anime/eps/${data.slugPlayer}/${e}`}>
                          Episode {e}
                        </Link>
                      </h1>
                    </div>
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
