import { config } from "dotenv";
import { HttpServer } from "./implementation/http-server";

const readConfig = () => {
  const { error } = config();
  if (error) {
    throw error;
  }

  return {
    port: process.env.SERVER_PORT ? String(process.env.SERVER_PORT) : "",
  };
};

const main = async () => {
  const { port } = readConfig();

  new HttpServer({
    port,
  });
};

main().catch(console.error);
