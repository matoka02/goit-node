// // 1.1 работа с FS через коллбеки-функции
// const fs = require("fs");
// fs.readFile('./files/file.txt', (error, data)=>{
//     console.log(error);     // null
//     console.log(data);      // <Buffer d0 9d d0 b8 d1 86 d1 88 d0 b5>
// });

// // 1.2 работа с FS через промисы
// // const fs = require("fs/promises");
// const fs = require("fs").promises;
// fs.readFile("./files/file.txt")
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error.message));

// // 1.3 работа с FS через промисы и асинхронные функции
// const fs = require("fs/promises");
// const readFile = async()=>{
//     const data = await fs.readFile('./files/file.txt');
//     console.log(data);
// }
// readFile();


// // 2 Приведение к utf-8 
// const fs = require("fs/promises");
// const readFile = async () => {
//   const buffer = await fs.readFile("./files/file.txt");
//   const text = buffer.toString();
//   console.log(text);
// };
// readFile();

// // рефакторинг
// const fs = require("fs/promises");
// const readFile = async () => {
//   const text = await fs.readFile("./files/file.txt", 'utf-8')
//   console.log(text);
// };
// readFile();


// 3 Операции с файлами

const fs = require("fs/promises");

// // 3.1 добавление текста
// const addText = async()=>{
//   // // аналог concat
//   // const result = await fs.appendFile('./files/file.txt', 'Так говорил Заратустра');      // НицшеТак говорил Заратустра
//   // с новой строки
//   const result = await fs.appendFile('./files/file2.txt', '\n Так говорил Заратустра');
//   console.log(result);          // undefined
// };
// addText();

// 3.2 перезапись
const replaceText = async()=>{
  const result = await fs.writeFile('./files/file.txt', 'Фридрих Ницше');
  console.log(result);
}
replaceText();
































