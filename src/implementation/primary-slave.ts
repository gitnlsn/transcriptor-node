import { TranscriptorSocketIo, ioTranscriptor } from "transcriptor-client";
import { transcribe } from "../utils/transcribe";

interface PrimarySlaveConstructorProps {
  host: string;
  port: string;
  protocol: string;
}

export class PrimarySlave {
  private server: TranscriptorSocketIo;

  constructor({ host, port, protocol }: PrimarySlaveConstructorProps) {
    this.server = ioTranscriptor({
      protocols: [protocol],
      host,
      port,
      autoConnect: true,
      reconnection: true,
    });

    this.setLogging();
    this.setListeners();
    this.server.connect();
  }

  connect() {
    this.server.connect();
  }

  private setListeners() {
    this.server.on("transcribe", async (data) => {
      if (data.length > 1024000) {
        this.server.emit("transcription", {
          status: "exceeded-file-size",
          speeches: [],
        });
        return;
      }

      try {
        const buffer = Buffer.from(JSON.parse(`[${data}]`));

        const transcription = await transcribe(buffer);

        this.server.emit("transcription", {
          status: "transcribed",
          speeches: transcription,
        });
      } catch (error) {
        console.error(error);
        this.server.emit("transcription", {
          status: "internal-server-error",
          speeches: [],
        });
      }
    });
  }

  private setLogging() {
    this.server.on("connect", console.info);
    this.server.on("disconnect", console.info);
    this.server.on("connect_error", console.error);
  }
}
