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
      const headline = $(element).find("h2").text();
      const summery = $(element).find("a > p").text();
      news.push({ headline, summery });
    });
  // console.log($(".listing-news-item > ul").find("li"));
  console.log(news);
};

scrape();
