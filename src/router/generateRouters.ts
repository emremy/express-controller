import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { TRouters, IRouters } from "./types";
const router = express.Router();

class generateRoute {
  modules: TRouters[] = [];
  routers: IRouters;
  protected getControllers = async () => {
    const controllerPath = path.join(__dirname, "/../controller");
    fs.readdirSync(controllerPath).map(async (controllerFolder) => {
      fs.readdirSync(path.join(controllerPath, "/" + controllerFolder)).map(
        async (file) => {
          const fileNameRequired = /\.controller\./;
          if (fileNameRequired.test(file)) {
            const moduleInfo =
              (await require(`@controller/${controllerFolder}/${file}`)
                .default) as TRouters;
            if (typeof moduleInfo !== "undefined") {
              this.modules.push(moduleInfo);
            }
          }
        }
      );
    });
  };
  generate = async () => {
    await this.getControllers();
    if (this.modules.length > 0 && typeof this.modules !== "undefined") {
      this.modules.map(async (route) => {
        if (typeof route !== "undefined") {
          route.handler.map((handler) => {
            const middlewares =
              typeof handler.middlewares === "undefined"
                ? []
                : handler.middlewares;
            this.routers = router[handler.method](
              handler.path,
              middlewares,
              handler.controller
            );
          });
        }
      });
    }
    return this.routers;
  };
}

export default new generateRoute();
