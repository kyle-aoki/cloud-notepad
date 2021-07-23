import fs from "fs";
import path from "path";
import shell from "./shell";

export default function getKeyPair() {
  shell("aws ec2 delete-key-pair --key-name ec2-key");
  console.log("Deleted key-pair named 'ec2-key'...");

  const output = shell("aws ec2 create-key-pair --key-name ec2-key");
  const keyMaterial = output.KeyMaterial;
  fs.writeFileSync(path.join(process.cwd(), "key-pairs", "ec2-key.pem"), keyMaterial);
  console.log("Created ec2 key-pair named 'ec2-key' and wrote Key Material to ./key-pairs/ec2-key.pem.");

  return "ec2-key";
}
