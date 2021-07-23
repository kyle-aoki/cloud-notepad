import getKeyPair from "../util/get-key-pair";
import shell from "../util/shell";
import { AMI } from "../util/text";
import path from "path";
import fs from "fs";
import sleep from "../util/sleep";
import chalk from "chalk";

let counter = 0;

async function main() {
  console.log("Attempting to create EC2...");
  const ec2Info = shell(`aws ec2 run-instances --image-id ${AMI()} --count 1 --instance-type t2.micro --key-name ${getKeyPair()}`);
  console.log("Initialized EC2...");

  getEc2Info: while (true) {
    console.log(`${counter} Attempting to get ec2-info...`);
    const info = shell("aws ec2 describe-instances");
    const ec2s = info.Reservations;
    for (const ec2 of ec2s) {
      if (ec2Info.Instances[0].InstanceId === ec2.Instances[0].InstanceId) {
        if (ec2.Instances[0].State.Name === "running") {
          fs.writeFileSync(path.join(process.cwd(), "ec2-info.json"), JSON.stringify(ec2, null, 2));
          console.log(chalk.green("EC2 successfully created."));
          console.log("EC2 Info is located in file 'ec2-info.json'.");
          break getEc2Info;
        }
      }
    }
    console.log("EC2 is still booting up. Waiting for 10 seconds...");
    counter++;
    await sleep(10000);
  }
}

main();
