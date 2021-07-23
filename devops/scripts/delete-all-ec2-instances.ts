import shell from "../util/shell";
import fs from "fs";
import path from "path";
import chalk from "chalk";

console.log("Looking for 'ec2-info.json' for instance-id...");

let ec2Info;
try {
  ec2Info = fs.readFileSync(path.join(process.cwd(), "ec2-info.json"), "utf-8");
} catch (e) {
  console.log("Error locating file 'ec2-info.json'.");
  console.log(e);
  process.exit(1);
}

ec2Info = JSON.parse(ec2Info);

const instances = ec2Info.Instances;

for (const instance of instances) {
  shell(`aws ec2 terminate-instances --instance-ids ${instance.InstanceId}`);
  console.log(`Terminated ${instance.InstanceId}`);
}

console.log("Deleting all key-pairs...");
for (const file of fs.readdirSync(path.join(process.cwd(), "key-pairs"))) {
  fs.rmSync(path.join(process.cwd(), "key-pairs", file));
}

console.log("Deleting 'ec2-info.json'...");
fs.rmSync(path.join(process.cwd(), "ec2-info.json"));

console.log(chalk.green("Done."));
