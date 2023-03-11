import { NextFunction, Response } from "express";
import { mockBooks } from "@src/utility/mock";
import helper from "@src/utility/helper";
import { GetBook } from "@src/controller/books/types";

export const checkBookId = (
  _req: GetBook,
  _res: Response,
  _next: NextFunction
) => {
  const book = mockBooks.find((book) => {
    return book.id === parseInt(_req.params.id);
  });
  if (helper.isUndefined(book)) {
    return _res.status(400).json({
      status: false,
      data: null,
      messages: "No such book was found.",
    });
  }
  _req.book = book;
  _next();
};
