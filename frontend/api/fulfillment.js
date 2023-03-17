import client from "dialogflow-fulfillment";
import { scrapeNews } from "./_scrapper";

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
      `<p style="margin:0; font-size:1rem; font-weight:bolder; background-color:#e3e3e3; padding:10px; margin-buttom:10px; border-radius:8px;">${randomNews.headline}</p> <p style="margin:0;"> ${randomNews.summary}</p>`
    );
  }

  let intents = new Map();
  intents.set("GetNews", sendNews);
  agent.handleRequest(intents);
}

// scrapper function
