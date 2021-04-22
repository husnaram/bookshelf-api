const { nanoid } = require("nanoid");
const bookshelf = require("../bookshelf");

const addBookHandler = (req, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = req.payload;
    const id = nanoid(9);
    const finished = false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (!name) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });

        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message:
                "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });

        response.code(400);
        return response;
    }

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        finished,
        pageCount,
        readPage,
        reading,
        insertedAt,
        updatedAt,
    };

    bookshelf.push(newBook);

    const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });

        response.code(201);
        return response;
    }

    const response = h.response({
        status: "error",
        messsage: "Buku gagal ditambahkan",
    });

    response.code(500);
    return response;
};

const getBooksHandler = (req, h) => {
    const { name, reading, finished } = req.query;
    const books = [];

    bookshelf.forEach((book) => {
        books.push({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        });
    });

    const response = h.response({
        status: "success",
        data: {
            books: books,
        },
    });

    response.code(200);
    return response;
};

const getBookHandler = (req, h) => {
    const { bookId } = req.params;
    const book = bookshelf.filter((book) => book.id === bookId)[0];

    if (book !== undefined) {
        return {
            status: "success",
            data: {
                book: book,
            },
        };
    }

    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
    });

    response.code(404);
    return response;
};

const updateBookHandler = (req, h) => {
    const { bookId } = req.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = req.payload;
    const updatedAt = new Date().toISOString();
    const bookIndex = bookshelf.findIndex((book) => book.id === bookId);

    if (!name) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });

        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message:
                "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });

        response.code(400);
        return response;
    }

    if (bookIndex !== -1) {
        bookshelf[bookIndex] = {
            ...bookshelf[bookIndex],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
    });

    response.code(404);
    return response;
};

const deleteBookHandler = (req, h) => {
    const { bookId } = req.params;
    const bookIndex = bookshelf.findIndex((book) => book.id === bookId);

    if (bookIndex !== -1) {
        bookshelf.splice(bookIndex, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus",
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
    });

    response.code(404);
    return response;
};

module.exports = {
    addBookHandler,
    getBooksHandler,
    getBookHandler,
    updateBookHandler,
    deleteBookHandler,
};
