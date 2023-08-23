const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

// передача ключа
sgMail.setApiKey(SENDGRID_API_KEY);

// создание объекта
const email = {
  to: "fixig95064@backva.com",
  from: "kurama.sama.024@gmail.com",
  subject: "Test email",
  html: "<p><strong>Test email</strong> from localhost:4000</p>",
};

// отправка
sgMail
  .send(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
