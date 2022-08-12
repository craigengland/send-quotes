const cron = require("node-cron");
const quotes = require("./quotes");
const template = require("./template");
const { MailtrapClient } = require("mailtrap");

require("dotenv").config();
// */1 * * * * * every second
// * * * * * every minute
// 0 8 * * 1 every Monday at 8:00am

const client = new MailtrapClient({
  endpoint: process.env.MAILTRAP_API_ENDPOINT,
  token: process.env.MAILTRAP_API_TOKEN,
});

const sender = {
  email: process.env.FROM_EMAIL,
  name: "Your quotation",
};
const recipients = [
  {
    email: process.env.RECIPIENT_EMAIL,
  },
];

const quote = quotes[Math.floor(Math.random() * quotes.length)];

client
  .send({
    from: sender,
    to: recipients,
    subject: "Your quote from Winnie the Pooh and friends!",
    html: template(quote),
  })
  .then(console.log, console.error);

// cron.schedule("* * * * *", function () {
//   // Get our random quote and pull out the text and character name

// });
