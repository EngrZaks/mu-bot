//this file was created to test and get the true value of the json credentials
const fs = require("fs");
const myCredentials = JSON.stringify(fs.readFileSync("credentials.json"));
console.log(myCredentials);
