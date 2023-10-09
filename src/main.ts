import { config } from "dotenv";
import { PrimarySlave } from "./implementation/primary-slave";

const readConfig = () => {
  const { error } = config();
  if (error) {
    throw error;
  }

  return {
    host: process.env.SERVER_HOST ? String(process.env.SERVER_HOST) : "",
    port: process.env.SERVER_PORT ? String(process.env.SERVER_PORT) : "",
    protocol: process.env.SERVER_PROTOCOL
      ? String(process.env.SERVER_PROTOCOL)
      : "",
  };
};

const main = async () => {
  const { host, port, protocol } = readConfig();

  const slave = new PrimarySlave({
    host,
    port,
    protocol,
  });

  slave.connect();
};

main().catch(console.error);
