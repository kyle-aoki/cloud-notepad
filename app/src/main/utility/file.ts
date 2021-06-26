export function getCanonicalFilePath(username: string, fileName: string, filePath: string[]) {
  const filePathString = getFilePath(filePath);
  return `${username}/${filePathString}/${fileName}`;
}

export function getFilePath(filePath: string[]) {
  return filePath.join("/");
}

export default function getFileSize(str: string) {
  return Buffer.byteLength(str, "utf8");
}
