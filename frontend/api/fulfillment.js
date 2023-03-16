import * as cheerio from "cheerio";
import axios from "axios";
import client from "dialogflow-fulfillment";

export default function getNews(req, res) {
  const agent = new client.WebhookClient({ request: req, response: res });
  console.log("cloud function working");
  async function sendNews(agent) {
    let newsArr = [];
    await scrapeNews().then((news) => {
      news.map((newsObj) => newsArr.push(newsObj));
    });
    let randindex = Math.floor(Math.random() * newsArr.length);
    const randomNews = newsArr[randindex];
    console.log("send news working!", randomNews);
    agent.add(
      `<p style="margin:0; font-size:1.2rem; font-weight:bolder;">${randomNews.headline}</p> <p style="margin:0;"> ${randomNews.summary}</p>`
    );
  }

  let intents = new Map();
  intents.set("GetNews", sendNews);
  agent.handleRequest(intents);
}

// scrapper function
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
      news.push({ headline, summary });
    });
  return news;
}
