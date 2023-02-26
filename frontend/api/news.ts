import { VercelRequest, VercelResponse } from "@vercel/node";

import * as cheerio from "cheerio";
import axios from "axios";
import client from "dialogflow-fulfillment";

const scrape = async () => {
  let news: { headline; summary }[] = [];
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
    .each((index: any, element: any) => {
      const headline = $(element).find("h2").text();
      const summary = $(element).find("a > p").text();
      news.push({ headline, summary });
    });
  // console.log($(".listing-news-item > ul").find("li"));
  return news;
};

// scrape();

export default async function getNews(req: VercelRequest, res: VercelResponse) {
  const agent = new client.WebhookClient({ request: req, response: res });
  function sendNews(agent: any) {
    scrape().then((news) => {
      agent.add(news[0].headline);
      console.log(news[0].headline);
    });
  }
  let intents = new Map();
  intents.set("GetNews", sendNews);
  agent.handleRequest(intents);
  // console.log(scrape());
}
