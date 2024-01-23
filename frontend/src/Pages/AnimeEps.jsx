import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../utils";

const AnimeEps = () => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [streamServer, setStreamServer] = useState(0);
  const [element, setElement] = useState([]);
  const { slugEps, eps } = useParams();
  const [frameLoad, setFrameLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api}/episode/${slugEps}`
        );
        const json = await response.json();

        if (response.ok) {
          setUrl(json.data.stream_url);
          setData(json.data);
          setElement(
            Array.from(
              { length: json.currentTotalEpisodes },
              (_, index) => index + 1
            )
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slugEps, eps, streamServer]);
  return (
    <div className="flex flex-col items-center">
      {!frameLoad && (
        <div className="absolute aspect-video lg:w-8/12 right-0 lg:h-[27.2rem] h-[17rem] bg-base-200 skeleton border-none rounded-none"></div>
      )}
      <div className="lg:grid grid-cols-3 w-full grid-flow-row auto-rows-min ">
        {data ? (
          <div className=" max-w-7xl h-max col-span-2 row-span-5 col-start-2 order-last lg:p-3">
            <div className="absolute w-0 h-0 bg-aksen right-16 top-[7.3rem] opacity-0  border border-aksen p-5" onClick={()=>alert('ank')}></div>
            <iframe
              src={url}
              frameBorder="0"
              className="w-full aspect-video "
              allow="autoplay; fullscreen"
              allowFullScreen
              autoPlay
              onLoad={() => setFrameLoad(true)}
            ></iframe>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
        {data && (
          <div className="w-full p-6 ml-6 order-1">
            <h1 className="text-2xl">{data.title}</h1>
            <h1 className="">Episode {data.currentEpisodes}</h1>
          </div>
        )}
        <div className=" col-span-1 col-start-1 row-span-3 row-start-2  hidden lg:block">
          <h1 className="w-full px-5 text-base pt-4 lg:ml-7">episodes : </h1>
          <div className="grid grid-flow-col lg:grid-cols-6 lg:grid-flow-row  gap-2 lg:auto-cols-[3rem] md:auto-cols-[9rem] auto-cols-[2.5rem] px-5 md:px-8 lg:px-12 overflow-x-auto h-auto lg:max-h-96 w-full no-scrollbar pt-3 overflow-y-auto max-w-[40rem] lg:h-80 pb-7 mb-14">
            {element.length > 0 &&
              element.map((e) => {
                return (
                  <div
                    key={e}
                    className={`bg-base-100  font-medium aspect-square text-center flex items-center justify-center rounded-lg  w-8`}
                  >
                    <Link
                      className=""
                      to={`/anime/eps/${slugEps}/${e}`}
                      onClick={() => setFrameLoad(false)}
                    >
                      <p
                        className={`${
                          e == data.currentEpisodes ? "text-aksen" : ""
                        }`}
                      >
                        {" "}
                        {e}
                      </p>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {data && (
        <div className="w-full p-6 lg:hidden">
          <h1 className="text-2xl">{data.title}</h1>
          <h1 className="">Episode {data.currentEpisodes}</h1>
        </div>
      )}

      {/* <div className="grid grid-cols-3 gap-2 p-5 grid-flow-row auto-cols-fr bg-base-100 m-3 gap-y-3 w-11/12">
        <h1 className=" col-span-3 ">Stream Server:</h1>
        {data &&
          data.videoPlayer.map((e, i) => {
            return (
              <div
                key={e.url}
                className="bg-aksen p-1 border rounded border-black w-full h-auto flex btn btn-active text-white"
                onClick={() => {
                  setStreamServer(i);
                  setFrameLoad(false);
                }}
              >
                <p>
                  {e.server} {e.quality}
                </p>
              </div>
            );
          })} */}
        {/* <h1 className=" col-span-3">Download Link</h1>
        {data &&
          data.download_urls.mkv.map((e) => {
            return (
              <div
                key={e.url}
                className="bg-aksen p-1 border rounded border-black w-full h-auto flex btn btn-active text-white"
              >
                <Link to={e.url} aria-label="Download" target="_blank">
                  <p>
                    {e.server} {e.quality}
                  </p>
                </Link>
              </div>
            );
          })} */}
      {/* </div> */}
    </div>
  );
};

export default AnimeEps;
