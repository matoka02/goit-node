// const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// // функция-посредник для отправки
// const sendEmail = async (data) => {
//   const email = { ...data, from: "kurama.sama.024@gmail.com" };
//   await sgMail.send(email);
//   return true;
// };

// module.exports = sendEmail;

const { SSL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'kurama.sama.024@gmail.com',
    pass: SSL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "kurama.sama.024@gmail.com" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
