import * as cheerio from "cheerio";
import axios from "axios";
export async function scrapeNews() {
  let news = [];
  const response = await axios.request({
    method: "GET",
    url: "https://www.mdx.ac.uk/news",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  const $ = cheerio.load(response.data);
  $(".listing-news-item > ul")
    .find("li")
    .each((index, element) => {
      const headline = $(element).find("h2").text();
      const summary = $(element).find("a > p").text();
      news.push({ headline, summary });
    });
  return news;
}
