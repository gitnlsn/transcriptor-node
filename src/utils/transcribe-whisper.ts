import { execPromise } from "audio-bash-utils";
import { formatTranscriptionOutput } from "./formatTranscriptionOutput";
import { WhisperSpeech } from "../interfaces/whisper-speech";
import { convertTimeToSeconds } from "./convertTimeToSeconds";
import { Speech } from "../interfaces/speech";

interface TranscribeWhisperProps {
  filePath: string;

  modelPath: string;
}

export const transcribeWhisper = async ({
  filePath,
  modelPath,
}: TranscribeWhisperProps) => {
  const transcription = await execPromise(
    `whisper-cpp -f ${filePath} -m ${modelPath} -l pt -nt`
  ).then(({ stdout }) => {
    return {
      time: 0,
      duration: 5,
      text: stdout.replace("\n", "").trim(),
    };
  });

  return {
    transcription: [transcription],
  };
};
