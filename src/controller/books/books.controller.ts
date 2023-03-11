import { Request, Response } from "express";
import { mockBooks } from "@src/utility/mock";
import { checkBookId } from "@src/middleware/getBook";
import { Book, GetBook } from "./types";

class BooksHandler {
  getBooksHandler = (_req: Request, _res: Response) => {
    return _res.status(200).json({
      status: true,
      data: mockBooks,
    });
  };

  getBookHandler = (_req: GetBook, _res: Response) => {
    return _res.status(200).json({
      status: true,
      data: _req.book,
    });
  };

  addBooksHandler = (_req: Request, _res: Response) => {
    const { books } = _req.body;
    books.map((book: Book) => {
      mockBooks.push(book);
    });
    return _res.status(201).json({
      status: true,
      data: mockBooks,
    });
  };
}

const BooksController = new BooksHandler();

export default {
  handler: [
    {
      path: "/read",
      method: "get",
      controller: BooksController.getBooksHandler,
    },
    {
      path: "/read/:id",
      method: "get",
      controller: BooksController.getBookHandler,
      middlewares: checkBookId,
    },
    {
      path: "/add",
      method: "post",
      controller: BooksController.addBooksHandler,
    },
  ],
};
