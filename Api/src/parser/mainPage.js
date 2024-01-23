import axios from "axios";
import * as cheerio from "cheerio";
import { BASEURL, chunkArray } from "../helpers/index.js";

const mainPage = async (pathName, page = "1") => {
  const URL = `${BASEURL}${pathName}${
      ~~page % 2 == 0 ? Math.ceil(~~page / 2) - 1 : Math.ceil(~~page / 2)
    }`,
    response = await axios.get(URL),
    $ = cheerio.load(response.data),
    maxPage = $(".pagin .page-numbers:not(.prev,.next,.dots):last")
      .text()
      .replace(/,| /g, ""),
    list = [];

  $(".tab-content .flw-item").each((i, el) => {
    const url = $(el).find("a.film-poster-ahref").attr("href"),
      slug = url.split("/")[url.split("/").length - 2],
      title = $(el).find("h3.film-name a").text(),
      poster = $(el).find(".film-poster img").attr("data-src"),
      star = $(el).find(".tick.ltr div").text().trim(),
      episodeOrType = $(el).find(".tick.rtl div").text().trim(),
      dataList = {
        url,
        slug,
        title,
        poster,
        star,
      };

    pathName.includes("anime") || pathName.includes("ongoing")
      ? (dataList.episode = episodeOrType)
      : (dataList.type = episodeOrType);

    list.push(dataList);
  });

  let data = {
    statusCode: 200,
    currentPage: ~~page,
    maxPage: ~~maxPage === 0 ? 1 : ~~maxPage * 2,
    list: ~~page % 2 == 0 ? chunkArray(list, 2)[1] : chunkArray(list, 2)[0],
  };
  data.list = data.list.filter(e=>e.slug !== "zoronime.com")
  if (~~page < 1) throw new Error("Page not found");

  return data;
};

export default mainPage;
