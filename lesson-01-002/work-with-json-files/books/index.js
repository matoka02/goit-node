const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const booksPath = path.join(__dirname, "books.json");
// console.log(booksPath);     // D:\tessa\goit-node\lesson-02\work-with-json-files\books\books.json

const getAll = async () => {
  // const data = await fs.readFile(`${__dirname}/books.json`, "utf-8");
  // const data = await fs.readFile(booksPath, "utf-8");
  const data = await fs.readFile(booksPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const books = await getAll();
  const result = books.find((item) => item.id === id);
  return result || null;
};

const add = async (data) => {
  const books = await getAll();
  const newBook = {
    id: nanoid(),
    ...data,
  };
  books.push(newBook);
  // перезапись файла
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2)); // null, 2 - чтобы перезапись не выполнилась в 1 строку
  return newBook;
};

const updateById = async (id, data) => {
  const books = await getAll();
  const index = books.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  books[index] = { id, ...data };
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return books[index];
};

const deleteById = async (id) => {
  const books = await getAll();
  const index = books.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = books.splice(index, 1);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
