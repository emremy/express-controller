import { Request } from "express";

export type Book = {
  id: number;
  name: string;
  author: string;
  publisher: string;
  publicationDate: string;
  abstract: string;
};

export interface GetBook extends Request {
  book: Book;
}
