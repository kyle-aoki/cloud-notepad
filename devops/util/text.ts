import path from "path";
import fs from "fs";

export function AMI() {
  console.log("Looking for file 'ubuntu-20-ami-id-us-west-1.txt'...");
  const ami = fs.readFileSync(path.join(process.cwd(), "ubuntu-20-ami-id-us-west-1.txt"), "utf-8");
  console.log(`Using this ami: ${ami}`);
  return ami;
}
