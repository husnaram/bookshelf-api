const {
    addBookHandler,
    getBooksHandler,
    getBookHandler,
    updateBookHandler,
    deleteBookHandler,
} = require("./handlers");

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: addBookHandler,
    },
    {
        method: "GET",
        path: "/books",
        handler: getBooksHandler,
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getBookHandler,
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: updateBookHandler,
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBookHandler,
    },
];

module.exports = routes;
