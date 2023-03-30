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
      `<a href='${randomNews.link}' target="_blank" style="color:black; display:block; text-decoration:none; margin-bottom:5px; font-size:1rem; font-weight:bolder; background-color:#e3e3e3; padding:10px; margin-buttom:10px; border-radius:8px;">${randomNews.title}</a> <p style="margin:0;"> ${randomNews.summary}</p>`
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
        response = `
      <h3>The following are the available scholarships for undergraduates</h3>
      <div style="padding:5px; background:#e3e3e3; display:flex; justify-content:space-between;"> 
        <p style="margin:0;">MDX starter kit </p>
        <a href="https://www.mdx.ac.uk/study-with-us/fees-and-funding/scholarships-and-bursaries/financial-packages-support/" target="_blank"> details</a>
      </div>
      <div style="padding:5px; display:flex; justify-content:space-between;"> 
        <p style="margin:0;">The MDX Excellence Scholarship </p>
        <a href="https://www.mdx.ac.uk/study-with-us/fees-and-funding/scholarships-and-bursaries/financial-packages-support" target="_blank"> details</a>
      </div>
      <div style="padding:5px; background:#e3e3e3; display:flex; justify-content:space-between;"> 
        <p style="margin:0;">The Santander Universities Scholars Programme </p>
        <a href="https://app.becas-santander.com/en/program/santander-scholarships-skills-santander-universities-scholars-programme" target="_blank"> details</a>
      </div>
      <div style="padding:5px;  display:flex; justify-content:space-between;"> 
        <p style="margin:0;">The Southern Housing Study4Success Award </p>
      </div>
      <div style="padding:5px; background:#e3e3e3; display:flex; justify-content:space-between;"> 
        <p style="margin:0;">Whatuni Financial Support Bursaries </p>
        <a href="mailto:MDXBursaries@mdx.ac.uk">email ✉️</a>
      </div>
      <div style="padding:5px;  display:flex; justify-content:space-between;"> 
        <p style="margin:0;">European Academic Awards </p>
        <a href="mailto:EU-enquiries@mdx.ac.uk" target="_blank">email ✉️</a>
      </div>
      <div style="padding:5px; background:#e3e3e3; display:flex; justify-content:space-between;"> 
        <p style="margin:0;">Significant achievement in sport </p>
        <a href="mailto:scholarships@mdx.ac.uk" target="_blank"> email ✉️</a>
      </div>
      <p>
      Visit <a href="https://www.mdx.ac.uk/study-with-us/fees-and-funding/scholarships-and-bursaries">our scholarship website</a> for more info on eligibility, how to apply and about other scholarships such as Course Scholarships, Scholarships for Women in STEM, etc.
      </p>
      `;
        break;
      case "postgraduate":
      case "postgraduates":
      case "graduate":
      case "graduates":
      case "alumni":
      case "masters":
      case "phd":
      case "doctorate":
        response = `
      <h3>The following are the available scholarships for postgraduates</h3>
      <div style="padding:5px; background:#e3e3e3; display:flex; justify-content:space-between;"> 
        <p style="margin:0;">The Alumni Bursary  </p>
        <a href="https://wgfp-prrw02.mdx.ac.uk:8001/ticket/portalticketcreation.aspx" target="_blank"> check eligibility</a>
      </div>
      <div style="padding:5px;  display:flex; justify-content:space-between;"> 
        <p style="margin:0;">Commonwealth scholarship  </p>
        <a href="https://cscuk.dfid.gov.uk/apply" target="_blank"> details</a>
      </div>
      <div style="padding:5px; background:#e3e3e3; display:flex; justify-content:space-between;"> 
        <p style="margin:0;">Chevening scholarship  </p>
        <a href="https://www.chevening.org/apply" target="_blank"> details</a>
      </div>
      <div style="padding:5px;  display:flex; justify-content:space-between;"> 
        <p style="margin:0;">European Academic Awards  </p>
        <a href="" target="_blank"> details</a>
      </div>
      <div style="padding:5px; background:#e3e3e3; display:flex; justify-content:space-between;"> 
        <p style="margin:0;"> </p>
       <span> <a href="mailto:EU-enquiries@mdx.ac.uk" target="_blank"> email ✉️</a> | 
        <a href="https://app.geckoform.com/public/#/modern/21FO00g4rozmi800bwt5wrejxb" target="_blank"> apply</a></span>
      </div>
      <p>
      Visit <a href="https://www.mdx.ac.uk/study-with-us/fees-and-funding/scholarships-and-bursaries">our scholarship website</a> for more info on eligibility, how to apply and about other scholarships such as Course Scholarships, Scholarships for Women in STEM, etc.
      </p>
      `;
        break;
      default:
        response = `Visit <a href="https://www.mdx.ac.uk/study-with-us/fees-and-funding/scholarships-and-bursaries">our scholarship website</a> for more info about scholarships.`;
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
