const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const {nanoid} = require("nanoid");

const app = express();

app.use(cors());
app.use(express.json());
// запрос поиска статичного файлаиз /public
app.use(express.static("public"));

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  // путь к папке хранения
  destination: tempDir,
  // функция, если нужно переименовать файл для хранения (до помещения на диск)
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});

// миддлвар
const upload = multer({
  storage: multerConfig
})

// нет БД
const books = [];

app.get('/api/books', (req, resp)=>{
    resp.json(books)
});

const booksDir = path.join(__dirname, 'public', 'books');

// upload.single('cover') - в каком поле будет передан файл
// upload.array("cover", 8) - передается 8 файлов
// upload.fields([{name: "cover", maxCount: 1}, {name: "subcover", maxCount: 2}]) - передается несколько полей и файлов
app.post('/api/books', upload.single('cover'), async(req, resp)=>{
  // 1. файл сохранен в папке /temp при отправке запроса
  // console.log(req.body);
  // console.log(req.file);
  // 2. файл перенесен из /temp в /public
  // await fs.rename('./temp/cover.jpg', './public/books/cover.jpg');

  // рефакторинг передачи файла
  const {path: tempUpload, originalname} = req.file;
  const resultUpload = path.join(booksDir, originalname);
  await fs.rename(tempUpload, resultUpload);

  // создание нового объекта
  const cover = path.join("books", originalname);
  const newBook = {
    id: nanoid(),
    ...req.body,
    cover,
  };
  books.push(newBook);
  
  // ответ
  resp.status(201).json(newBook);
})

app.listen(4000);