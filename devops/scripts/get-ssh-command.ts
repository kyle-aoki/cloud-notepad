import fs from 'fs';
import path from 'path';

const ec2Info = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'ec2-info.json'), 'utf-8'));

const publicDns = ec2Info.Instances[0].PublicDnsName;

console.log('Run this command to SSH into this EC2:');
console.log(`Windows --> ssh -i key-pairs\\ec2-key.pem ubuntu@${publicDns}`);
