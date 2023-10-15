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
  const outputFilename = formatTranscriptionOutput({ filePath });

  await execPromise(
    `whisper-cpp -f ${filePath} -m ${modelPath} -l pt -bo 10 -p 2 -oj -of ${outputFilename}`
  );

  const transcription = await execPromise(
    `jq '.transcription | .[] | { start: .timestamps.from, end: .timestamps.to, text: .text }' ${outputFilename}.json | jq -s --compact-output`
  )
    .then(({ stdout }) => JSON.parse(stdout) as WhisperSpeech[])
    .then((speechList) =>
      speechList.map(({ start: startString, end: endString, text }) => {
        const start = convertTimeToSeconds(startString);
        const end = convertTimeToSeconds(endString);
        const duration = end - start;

        return {
          time: start,
          duration,
          text,
        } as Speech;
      })
    );

  await execPromise(`rm ${outputFilename}.json`);

  return {
    transcription,
  };
};
