import * as cheerio from "cheerio";
import axios from "axios";
import client from "dialogflow-fulfillment";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function getNews(req: VercelRequest, res: VercelResponse) {
  const agent = new client.WebhookClient({ request: req, response: res });
  console.log("cloud function working");
  async function sendNews(agent: any) {
    let newsArr: News[] = [];
    await scrapeNews().then((news) => {
      news.map((newsObj) => newsArr.push(newsObj));
    });
    let randindex = Math.floor(Math.random() * newsArr.length);
    const randomNews = newsArr[randindex];
    console.log("send news working!", randomNews);
    agent.add(
      `<a href='${randomNews.link}' style="color:black; text-decoration:none; margin:0; font-size:1rem; font-weight:bolder; background-color:#e3e3e3; padding:10px; margin-buttom:10px; border-radius:8px;">${randomNews.headline}</a> <p style="margin:0;"> ${randomNews.summary}</p>`
    );
  }

  let intents = new Map();
  intents.set("GetNews", sendNews);
  agent.handleRequest(intents);
}

// News scrapper function
export async function scrapeNews() {
  let news: News[] = [];
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

// Event scrapper function
const scrapeEvent = async () => {
  let events: Events[] = [];
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
    const title = $(el).find(".event-name").text();
    const time = $(el).find(".venue-text").eq(1).text();
    const venue = $(el).find(".venue-text").eq(2).text();
    const description = $(el).find("p").last().text();
    const link = $(el).find("a").attr("href");

    const event = { date: date.trim(), title, time, venue, description, link };
    events.push(event);
  });
  return events;
};

interface News {
  link: string | undefined;
  headline?: string;
  summary?: string;
}
interface Events extends News {
  date: string;
  title: string;
  time: string;
  venue: string;
}
