import client from "dialogflow-fulfillment";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { News, Events } from "./types";
import { scrapeEvent, scrapeNews } from "./_utils";
import {
  defaultScholarshipMarkup,
  postgraduateMarkup,
  undergraduateMarkup,
} from "./_markups";

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
      `<a href='${randomNews.link}' target="_blank" style="color:black; display:block; text-decoration:none; margin-bottom:5px; font-size:1rem; font-weight:bolder; background-color:#e3e3e3; padding:10px; margin-buttom:10px; border-radius:8px;">${randomNews.title}</a> 
      <p style="margin:0;"> ${randomNews.summary}</p>
      <p style="margin:0; font-size:0.7rem">ℹ️ click on the headline above 👆🏽 for th full news </p>
      <p style="margin:0; font-size:0.7rem">ℹ️ ask about news again to get a different* news</p>
      `
    );
  }
  async function getEvents(agent: any) {
    let response = `<h3>Upcoming Events</h3> <div>`;
    let eventsArr: Events[] = [];
    await scrapeEvent().then((event) => {
      event.map((eventsObj) => eventsArr.push(eventsObj));
    });
    for (const event of eventsArr) {
      response += `<a href='${event.link}' target="_blank" style="color:black; display:block; text-decoration:none; margin-bottom:5px; background-color:#e3e3e3; padding:10px; margin:5px 0; border-radius:10px;"><h4>${event.title}</h4> <p style="margin:0">📅 ${event.date}</p> <span style="display:flex; align-items:center; justify-content:space-between"><p style="font-family: 'Orbitron', sans-serif; margin:0;">⏱️ ${event.time}</p> <p style="margin:0">📍 ${event.venue}</p></span> </a> `;
    }
    response += "</div>";
    agent.add(response);
  }
  async function getScholarships(agent: any) {
    const scholarshipType = agent.parameters["scholarship-type"];

    let response = "";
    switch (scholarshipType) {
      case "undergraduate":
      case "undergraduates":
      case "degree":
      case "bachelor":
        response = undergraduateMarkup;
        break;
      case "postgraduate":
      case "postgraduates":
      case "graduate":
      case "graduates":
      case "alumni":
      case "masters":
      case "phd":
      case "doctorate":
        response = postgraduateMarkup;
        break;
      default:
        response = defaultScholarshipMarkup;
        break;
    }

    agent.add(response);
  }

  let intents = new Map();
  intents.set("GetNews", sendNews);
  intents.set("Events", getEvents);
  intents.set("scholarships", getScholarships);
  agent.handleRequest(intents);
}

// News scrapper function
