import * as cheerio from "cheerio";
import axios from "axios";
import client from "dialogflow-fulfillment";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function fulfillmentHandler(
  req: VercelRequest,
  res: VercelResponse
) {
  const agent = new client.WebhookClient({ request: req, response: res });

  async function sendNews(agent: any) {
    let newsArr: News[] = [];
    await scrapeNews().then((news) => {
      news.map((newsObj) => newsArr.push(newsObj));
    });
    let randindex = Math.floor(Math.random() * newsArr.length);
    const randomNews = newsArr[randindex];
    console.log("send news working!", randomNews);
    agent.add(
      `<a href='${randomNews.link}' target="_blank" style="color:black; display:block; text-decoration:none; margin:5px; font-size:1.1rem; font-weight:bolder; background-color:#e3e3e3; padding:10px; margin-buttom:10px; border-radius:8px;">${randomNews.title}</a> <p style="margin:0;"> ${randomNews.summary}</p>`
    );
  }

  async function getEvents(agent: any) {
    let response = `<div>`;
    let eventsArr: Events[] = [];
    await scrapeEvent().then((event) => {
      event.map((eventsObj) => eventsArr.push(eventsObj));
    });
    for (const event of eventsArr) {
      response += `<h5>${event.title}</h5> <p>${event.date}</p>`;
    }
    response += "</div>";
    agent.add(response);
  }

  let intents = new Map();
  intents.set("GetNews", sendNews);
  intents.set("Events", getEvents);
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
      const title = $(element).find("h2").text();
      const summary = $(element).find("a > p").text();
      const link = $(element).find("a").attr("href");
      news.push({ title, summary, link });
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
  title: string;
  summary?: string;
}
interface Events extends News {
  date: string;
  time: string;
  venue: string;
}
