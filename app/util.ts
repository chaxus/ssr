import * as fs from "fs";
import * as path from "path";
import serve from "koa-static";
import content from "@/ssr";
import {
  PRODUCTION,
  PRODUCTION_DIR,
  DEVELOPMENT_DIR,
  TEMPLATE_PATH,
  UTF8,
  TEMPLATE_SLOT,
  LOCAL_URL,
  PORT,
} from "./constant";
import { exec } from "child_process";
import colors from "colors";

const resolve = (pathname: string) => path.resolve(__dirname, pathname);

const filePath =
  process.env.NODE_ENV === PRODUCTION ? PRODUCTION_DIR : DEVELOPMENT_DIR;

export const template = fs
  .readFileSync(resolve(`${filePath}${TEMPLATE_PATH}`), UTF8)
  .replace(TEMPLATE_SLOT, content);

export const staticFile = serve(resolve(filePath));

export const openBrower = () => {
  const device = process.platform;
  if (device === "win32") {
    exec(`start ${LOCAL_URL}`);
  }
  exec(`open ${LOCAL_URL}`);
};

export const serverSuccess = () => {
  console.info(
    colors.green(
      `===========================> Server Start at ${PORT} <===============================`
    )
  );
  openBrower();
};
