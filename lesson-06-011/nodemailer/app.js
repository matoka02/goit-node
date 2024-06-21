const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, SSL_PASSWORD } = process.env;

// создание объекта настроек для удаленного доступа через протокол POP3/SMTP
const nodemailerConfig = {
  // host: 'smtp.meta.ua',
  // port: 465, // 25, 2525 - это порты meta.ua
  // secure: true,
  // auth: {
  //   user: 'tessa02@meta.ua',
  //   pass: META_PASSWORD,
  // },
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'kurama.sama.024@gmail.com',
    pass: SSL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// создание объекта настроек письма
const email = {
  to: "tahogeg206@elahan.com",
  from: "kurama.sama.024@gmail.com",
  subject: "Test email",
  html: "<p><strong>Test email</strong> from localhost:4000</p>",
};

transport.sendMail(email)
  .then(() => console.log("Email send success"))
  .catch(error => console.log(error.message));