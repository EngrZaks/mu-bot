const cheerio = require("cheerio");
const axios = require("axios");
const scrape = async () => {
  let events = [];
  const response = await axios.request({
    method: "GET",
    url: "https://www.mdx.ac.uk/events",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  const $ = cheerio.load(response.data);
  $(".strip-boxes-4 > .strip-boxes__item").each((i, el) => {
    const date = $(el).find(".venue-text").eq(0).text();
    const name = $(el).find(".event-name").text();
    const time = $(el).find(".venue-text").eq(1).text();
    const venue = $(el).find(".venue-text").eq(2).text();
    const description = $(el).find("p").last().text();
    const link = $(el).find("a").attr("href");

    const event = { date: date.trim(), name, time, venue, description, link };
    events.push(event);
  });
  return events;
};

async function scrapeNews() {
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
      const link = $(element).find("a").attr("href");

      news.push({ headline, summary, link });
    });
  return news;
}

scrapeNews().then((event) => console.log(event));
