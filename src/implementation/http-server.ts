import express, { Express, Request, Response } from "express";
import { transcribe } from "../utils/transcribe";

interface ServerConstructorProps {
  port: string;
}

export class HttpServer {
  private server: Express;

  constructor({ port }: ServerConstructorProps) {
    this.server = express();
    this.server.use(
      express.json({
        limit: "1024kb",
      })
    );

    this.config();

    this.server.listen(Number(port), () =>
      console.log(`Server listing at port ${port}`)
    );
  }

  private config() {
    this.server.get("/", (_, res) => {
      return res.json({ status: "ok" });
    });

    this.server.post("/transcribe", async (req: Request, res: Response) => {
      const data = req.body as number[];

      if (data.length > 1024000) {
        return res.json({
          status: "exceeded-file-size",
          speeches: [],
        });
      }

      try {
        const buffer = Buffer.from(data);

        const transcription = await transcribe(buffer);

        return res.json({
          status: "transcribed",
          speeches: transcription,
        });
      } catch (error) {
        console.error(error);
        return res.json({
          status: "internal-server-error",
          speeches: [],
        });
      }
    });
  }
}
