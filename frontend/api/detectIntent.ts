import type { VercelRequest, VercelResponse } from "@vercel/node";

import dialogflow from "@google-cloud/dialogflow";
// gcloud CREDENTIALS
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS as string);

// project id
const PROJECTID = CREDENTIALS.project_id;
console.log(PROJECTID);

// dialogflow client configuration
const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS["private_key"],
    client_email: CREDENTIALS["client_email"],
  },
};

//Serverless function
export default async function detectIntent(
  req: VercelRequest,
  res: VercelResponse
) {
  const { queryText, sessionId } = req.body;
  // configuring client
  const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);
  //method for detecting intent
  const detectIntent = async (
    languageCode: string,
    queryText: string,
    sessionId: string
  ) => {
    let sessionPath = sessionClient.projectAgentSessionPath(
      PROJECTID,
      sessionId
    );
    // the query text
    let request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: queryText, // the query to send to the dialogflow agent
          languageCode, // language used by the client (en-US)
        },
      },
    };
    // send request and get response
    try {
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      return {
        response: result
          ? result.fulfillmentText
          : "Soryy🙇🏽 Couldn't get result at the moment. please 🙏🏽 try again later",
      };
    } catch (error) {
      return {
        error,
      };
    }
  };
  try {
    const data = await detectIntent("en", queryText, sessionId);
    res.status(200).send(data);
    console.log(data);
  } catch (error) {
    res.status(404).send("Erro getting intent");
    console.log(error);
  }
}
