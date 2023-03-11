import { IRouter, RequestHandler, Router } from "express";

export type TMethod = "put" | "get" | "post" | "delete";
export type THandler = {
  controller: IRouter;
  middlewares: RequestHandler;
  method: TMethod;
  path: string;
};
export type TRouters = {
  handler: THandler[];
};
export interface IRouters extends Router {}
export type TResponse = {
  [key: string]: any;
};
export type TFolderInfo = {
  type: string;
  files: Array<string>;
};
