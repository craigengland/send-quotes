const quotes = require("../quotes");
const template = require("../template");
const { MailtrapClient } = require("mailtrap");
const fs = require("fs");

require("dotenv").config();

export default async function quote(request, response) {
  const quotation = await getQuote();
  await sendEmail(quotation);
  return response.status(200).send(quotation);
}

async function getBase64(file) {
  const base64String = fs.readFileSync(file, { encoding: "base64" });
  return base64String;
}

async function getQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return quote;
}

async function sendEmail(quote) {
  // Create and connect to mailtrap client
  const client = new MailtrapClient({
    endpoint: process.env.MAILTRAP_API_ENDPOINT,
    token: process.env.MAILTRAP_API_TOKEN,
  });

  // Determine where we send the email from and some meta data
  const sender = {
    email: process.env.FROM_EMAIL,
    name: "Today's quotation from the world of Winnie the Pooh",
  };

  // Gather up the recipients
  const recipients = [
    {
      email: process.env.RECIPIENT_EMAIL,
    },
  ];

  // Get base64 from relevant image
  const imageString = await getBase64(`./assets/${quote.path}.png`);
  return client
    .send({
      from: sender,
      to: recipients,
      subject: "Your quote from Winnie the Pooh and friends!",
      html: template(quote),
      attachments: [
        {
          content: imageString,
          type: "text/plain",
          filename: "assets/winnie.png",
          disposition: "inline",
          content_id: quote.path,
        },
      ],
      category: "quotation",
    })
    .then(console.log, console.error);
}
