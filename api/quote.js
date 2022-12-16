// const quotes = require("../quotes");
// const template = require("../template");
// const { MailtrapClient } = require("mailtrap");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config();

// async function quote(request, response) {
//   const quotation = await getQuote();
//   const image = await getFilePath(quotation.path);
//   const imageString = await getBase64(image);
//   await sendEmail(quotation, imageString);
//   return response.status(200).send(quotation);
// }

// async function getFilePath(filePath) {
//   return fs.readFileSync(path.join(__dirname, `assets/${filePath}.png`));
// }

// async function getBase64(image) {
//   const base64String = fs.readFileSync(image, { encoding: "base64" });
//   return base64String;
// }

// async function getQuote() {
//   const quote = quotes[Math.floor(Math.random() * quotes.length)];

//   return quote;
// }

// async function sendEmail(quote, base) {
//   // Create and connect to mailtrap client
//   const client = new MailtrapClient({
//     endpoint: process.env.MAILTRAP_API_ENDPOINT,
//     token: process.env.MAILTRAP_API_TOKEN,
//   });

//   // Determine where we send the email from and some meta data
//   const sender = {
//     email: process.env.FROM_EMAIL,
//     name: "Today's quotation from the world of Winnie the Pooh",
//   };

//   // Gather up the recipients
//   const recipients = [
//     {
//       email: process.env.RECIPIENT_EMAIL,
//     },
//   ];

//   return client
//     .send({
//       from: sender,
//       to: recipients,
//       subject: "Your quote from Winnie the Pooh and friends!",
//       html: template(quote),
//       attachments: [
//         {
//           content: base,
//           type: "text/plain",
//           filename: `assets/${quote.path}.png`,
//           disposition: "inline",
//           content_id: quote.path,
//         },
//       ],
//       category: "quotation",
//     })
//     .then(console.log, console.error);
// }

require("dotenv").config();
const schedule = require("node-schedule");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(request, response) {
  const job = schedule.scheduleJob("30 * * * *", function () {
    const msg = {
      to: "crgnglnd@gmail.com", // Change to your recipient
      from: "craig@craigengland.co.uk", // Change to your verified sender
      subject: `Cheers to a new day!`,
      text: "Hope your day has been well!",
    };
    sgMail.send(msg);
  });
  return response.status(200);
}
