import express, { NextFunction } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import * as dotenv from "dotenv";
import generateRoute from "@src/router/generateRouters";

dotenv.config({ path: __dirname + "/.env" });

const startServer = async () => {
  const app = express();
  app.use(helmet());

  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "/src/views"));
  app.set("view options", { pretty: true });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/cdn", express.static(path.join(__dirname, "/src/public")));
  const routers = await generateRoute.generate();
  app.use(routers);

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`🚀 Server is online. http://127.0.0.1:${port}`);
  });
};
startServer();
