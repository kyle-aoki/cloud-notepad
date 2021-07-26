import shell from "../util/shell";
import fs from "fs";
import path from "path";
import chalk from "chalk";

function main() {
  console.log("Looking for 'ec2-info.json' for instance-id...");

  let ec2Info;
  try {
    ec2Info = fs.readFileSync(path.join(process.cwd(), "ec2-info.json"), "utf-8");
  } catch (e) {
    console.log("Could not find file 'ec2-info.json'...");
    console.log("Continuing with script...");
    return;
  }

  console.log("Found ec2-info.json...");

  ec2Info = JSON.parse(ec2Info);

  const instances = ec2Info.Instances;

  console.log("Beginning delete sequence...");

  for (const instance of instances) {
    try {
      shell(`aws ec2 terminate-instances --instance-ids ${instance.InstanceId}`);
      console.log(`Terminated ${instance.InstanceId}`);
    } catch (e) {
      console.log("Error deleting ec2");
      console.log(e);
    }
  }

  console.log("Deleting all key-pairs...");
  for (const file of fs.readdirSync(path.join(process.cwd(), "key-pairs"))) {
    fs.rmSync(path.join(process.cwd(), "key-pairs", file));
  }

  console.log("Deleting 'ec2-info.json'...");
  fs.rmSync(path.join(process.cwd(), "ec2-info.json"));

  console.log(chalk.green("Done."));
}

main();
