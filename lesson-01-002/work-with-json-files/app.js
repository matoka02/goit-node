const books = require("./books");

// console.log(books);

// // абсолютный путь относительно диска
// console.log(__dirname);   // D:\tessa\goit-node\lesson-02\work-with-json-files

const invokeAction = async ({ action, id, title, author }) => {
  switch (action) {
    case "read":
      const allBooks = await books.getAll();
      return console.log(allBooks);
    case "getById":
      const oneBook = await books.getById(id);
      return console.log(oneBook);
    case "add":
      const newBook = await books.add({ title, author });
      return console.log(newBook);
    case "updateById":
      const updateBook = await books.updateById(id, { title, author });
      return console.log(updateBook);
    case 'deleteById':
      const deleteBook = await books.deleteById(id);
      return console.log(deleteBook);
    // // не нужен break, т.к. везде return
    // default:
    //   break;
  }
};

// invokeAction({ action: "read" });
// invokeAction({ action: "getById", id: "e1Tpn_I3wBkLREY6wG0lb" });
// invokeAction({ action: "add", title: "Worm", author: "John C. McCrae" });

// // при замене даже 1 параметра нужно передать все параметры, т.к. будет перезаписан файл
// invokeAction({ action: 'updateById', id: "m4DkzqLsK2RR13cxhkg29", title: "Ward", author: "John C. McCrae" }); 

// invokeAction({ action: 'deleteById', id: "m4DkzqLsK2RR13cxhkg29", title: "Ward", author: "John C. McCrae" }); 