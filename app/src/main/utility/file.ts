export function getCanonicalFilePath(username: string, fileName: string, filePath: string[]) {
  const filePathString = getFilePath(filePath);
  if (filePathString) return `${username}/${filePathString}/${fileName}`;
  return `${username}/${fileName}`;
}

export function getFilePath(filePath: string[]) {
  if (filePath.length === 0) return false;
  return filePath.join("/");
}

export default function getFileSize(str: string) {
  return Buffer.byteLength(str, "utf8");
}
