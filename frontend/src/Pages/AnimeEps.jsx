import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
          `http://localhost:3000/anime/${slugEps}/${eps}`
        );
        const json = await response.json();

        const originalString = json.videoPlayer[streamServer].url;
        const wordToRemove = "&autoplay=true";

        const stringWithoutWord = originalString.replace(
          new RegExp(wordToRemove, "g"),
          ""
        );
        if (response.ok) {
          setUrl(stringWithoutWord);
          setData(json);
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
        <div className="absolute aspect-video w-full bg-base-200 skeleton border-none rounded-none"></div>
      )}
      {data ? (
        <div className="w-full flex justify-end ">
          <iframe
            src={url}
            frameBorder="0"
            className="w-full md:w-9/12  aspect-video "
            allow="autoplay; fullscreen"
            allowFullScreen
            autoPlay
            onLoad={() => setFrameLoad(true)}
          ></iframe>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <h1 className="w-full px-5 text-base pt-4">episodes : </h1>
      <div className="grid grid-flow-col gap-2 lg:auto-cols-[10rem] md:auto-cols-[9rem] auto-cols-[2.5rem] px-5 md:px-8 lg:px-12 overflow-x-auto h-auto w-full no-scrollbar pt-3">
        {element.length > 0 &&
          element.map((e) => {
            return (
              <div
                key={e}
                className={`bg-base-100  font-medium aspect-square text-center flex items-center justify-center rounded-lg `}
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
      {data && (
        <div className="w-full p-6">
          <h1 className="text-2xl">{data.title}</h1>
          <h1 className="">Episode {data.currentEpisodes}</h1>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 p-5 grid-flow-row auto-cols-fr bg-base-100 m-3 gap-y-3 w-11/12">
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
          })}
        <h1 className=" col-span-3">Download Link</h1>
        {data &&
          data.downloadLink.map((e) => {
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
          })}
      </div>
    </div>
  );
};

export default AnimeEps;
