// const moment = require('moment');
// const dateFns = require('date-fns');

const isLeapYear = (year) => {
  // wrong date format
  if(year === undefined) {
    throw new Error('year must be exist')
  };

  if(typeof year !== "number") {
    throw new Error('year must be number')
  };

  if(!Number.isInteger(year)) {
    throw new Error('year must be integer')
  };

  if(year < 42) {
    throw new Error('year must 42 or more');
  };

  // multiplicity check
  const date = new Date(year, 2, 0);
  const days = date.getDate();
  return (29 === days)
};

module.exports = isLeapYear;

/* проверка по нулевому дню второго месяца (01.03) вернет последний день первого месяца (28.02 или 29.02)
*/