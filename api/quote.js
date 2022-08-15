const quotes = require("../quotes");
const template = require("../template");
const { MailtrapClient } = require("mailtrap");

require("dotenv").config();

export default async function quote(request, response) {
  const quotation = await getQuote();

  return response.status(200).send(quotation);
}

function getQuote() {
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
}
