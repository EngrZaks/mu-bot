const dialogflow = require("@google-cloud/dialogflow");
require("dotenv").config();
const fs = require("fs");
const express = require("express");
var bodyParser = require("body-parser");
const { query } = require("express");

// initialise express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// gcloud credentials
const CREDENTIALS = JSON.parse(fs.readFileSync("credentials.json"));

// gcloud project ID
const PROJECTID = CREDENTIALS.project_id;

// dialogflow client configuration
const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS["private_key"],
    client_email: CREDENTIALS["client_email"],
  },
};

// configuring client
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

//method for detecting intent
const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(PROJECTID, sessionId);
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
      respons: result.fulfillmentText,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

// default home route
app.get("/", (req, res) => res.send("hello from MU Chatbot"));

// intent detection route
app.post("/intent", async (req, res) => {
  const { queryText, sessionId } = req.body;
  console.log(queryText, sessionId, req.body);
  try {
    const data = await detectIntent("en", queryText, sessionId);
    res.status(200).send(data);
    console.log(data);
  } catch (error) {
    res.status(404).send("Erro getting intent");
    console.log(error);
  }
});

// starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is up and running on port ${PORT}`));

detectIntent("en", "hello", "3#3333rdfffrr45t65555")
  .then((result) => console.log(result))
  .catch((e) => console.log(e));

// async function detectIntent(
//   projectId,
//   sessionId,
//   query,
//   contexts,
//   languageCode
// ) {
//   // The path to identify the agent that owns the created intent.
//   const sessionPath = sessionClient.projectAgentSessionPath(
//     projectId,
//     sessionId
//   );

//   // The text query request.
//   const request = {
//     session: sessionPath,
//     queryInput: {
//       text: {
//         text: query,
//         languageCode: languageCode,
//       },
//     },
//   };

//   if (contexts && contexts.length > 0) {
//     request.queryParams = {
//       contexts: contexts,
//     };
//   }

//   const responses = await sessionClient.detectIntent(request);
//   return responses[0];
// }

detectIntent(PROJECTID, "123hulaba", "benefits for alumni", "", "en").then(
  (data) => console.log(data)
);
