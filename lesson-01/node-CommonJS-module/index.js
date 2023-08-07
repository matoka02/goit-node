// CommonJS
// импорт из npm-пакета
const nodemon = require("nodemon");

// импорт из файла 
// const users = require("./users");
// console.log(users);

// // переназвать
// const obj = require("./users");
// console.log(obj);

// деструктуризация
const obj = require("./users");
const {admins} = require('./users');
// console.log(admins);

// // импорт из папки date/index.js
// const {getCurrentMonth} = require('./date');
// const currentMonth = getCurrentMonth();
// console.log(`Now ${currentMonth} month`);

// рефакторинг
const currentMonth = require('./date').getCurrentMonth();
// console.log(`Now ${currentMonth} month`);


















