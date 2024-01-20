import { useParams ,Link} from "react-router-dom";
import { useEffect, useState,lazy } from "react";
const CardPreview = lazy(() => import("../components/Card"));
const MovieInfo = () => {
  const { slug } = useParams();
  const [data, setData] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movie/${slug}`);
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          setData(json);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug]);

  
  return (
    <div>
      <div>
        {!data && <div className=""></div>}
        {data && (
          <div className="flex flex-col items-center w-full">
            <img
              src={data && data.poster}
              alt="anime Img"
              className="w-40  rounded mt-8"
            />
            <h1 className="text-2xl mt-5 text-center mx-5 ">{data.title}</h1>
            <ul className="flex gap-3 mt-8">
              <li>Anime</li>
              <li>7.1</li>
              <li>Ongoing</li>
            </ul>

            <div className="">{
                 <iframe
                 src={data.videoPlayer[0].url}
                 frameBorder="0"
                 className="w-[400px]  aspect-video"
                 allow="autoplay;"
                 allowFullScreen
               ></iframe>
              }</div>
          </div>
        )}
      </div>
    </div>  
  );
};

export default MovieInfo;
