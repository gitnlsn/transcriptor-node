import { basename, dirname, extname, join } from 'path';

interface FormatTranscriptionOutputProps {
  filePath: string;
}

export const formatTranscriptionOutput = ({ filePath }: FormatTranscriptionOutputProps) => {
  const extension = extname(filePath);
  const filename = basename(filePath, extension);
  const dirPath = dirname(filePath);

  return join(dirPath, `${filename}`);
};
