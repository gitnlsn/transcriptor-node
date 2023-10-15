import { convert, execPromise, mkTemp, validateFile } from "audio-bash-utils";
import { writeFileSync } from "fs";
import { transcribeWhisper } from "./transcribe-whisper";

export const transcribe = async (buffer: Buffer) => {
  const tempFile = await mkTemp({
    dryRun: true,
    ext: ".opus",
  });

  const tempWavFile = await mkTemp({
    dryRun: true,
    ext: ".wav",
  });

  writeFileSync(tempFile, buffer);

  await validateFile({ filePath: tempFile });

  await convert({
    filePath: tempFile,
    outfilePath: tempWavFile,
  });

  const { transcription } = await transcribeWhisper({
    filePath: tempWavFile,
    modelPath: "/app/ggml-base.bin",
  });

  await execPromise(`rm ${tempFile} ${tempWavFile}`);

  return transcription;
};
