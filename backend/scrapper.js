const cheerio = require("cheerio");
const axios = require("axios");
let news = [];
const scrape = async () => {
  const response = await axios.request({
    method: "GET",
    url: "https://www.mdx.ac.uk/news",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  const $ = cheerio.load(response.data);
  // console.log($(".hero-banner"));
  $(".listing-news-item > ul")
    .find("li")
    .each((index, element) => {
      let headline = $(element).find("h2").text();
      let summary = $(element).find("a > p").text();
      headline = headline.toUpperCase();
      news.push({ headline, summary });
    });
  // console.log($(".listing-news-item > ul").find("li"));
  // console.log(news);
  return news;
};
module.exports = scrape;
// scrape().then((news) => console.log(news));
