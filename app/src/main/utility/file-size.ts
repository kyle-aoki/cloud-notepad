export default function getBinarySize(str: string) {
  return Buffer.byteLength(str, "utf8");
}
