export default function getCanonicalFilePath(username: string, filePath: string) {
  return `${username}/${filePath}`;
}
