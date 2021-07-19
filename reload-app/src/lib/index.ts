import shell from 'shelljs';
import crypto, { KeyObject } from 'crypto';
import fs from 'fs';

export default function reloadApp(req: any, res: any, next: any) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET as unknown as KeyObject;
  if (!WEBHOOK_SECRET) {
    throw new Error('Missing webhook secret.');
  }

  fs.writeFileSync('req.json', JSON.stringify(req));

  console.log('Starting reload...');

  let requestBodyHashFromGithub;
  let localRequestBodyHash;
  try {
    requestBodyHashFromGithub = req.headers["x-hub-signature-256"];
    localRequestBodyHash = hashRequestBodyWithSha256(req.body, WEBHOOK_SECRET);
  } catch (e) {
    console.log('Something went wrong hashing the request body...');
    console.log(e);
    return;
  }

  console.log('Created hash from request body...');

  if (requestBodyHashFromGithub !== localRequestBodyHash) {
    console.log('ERROR: Hash from github does not match hash generated on server.')
    return;
  }

  console.log('Beginning sequence of shell commands...');

  console.log('Switching into app directory...');
  shell.cd('..');
  shell.cd('app');

  console.log('Beginning sequence of shell commands...');
  exec('npm run clean');
  exec('git pull');
  exec('npm i');
  exec('npm run build');
  exec('npm run server-reload');

  console.log('SUCCESS: Finished executing shell commands.');
}

function exec(command: string) {
  console.log(`Executing '${command}'`);
  shell.exec(command);
}

function hashRequestBodyWithSha256(reqBody: any, WEBHOOK_SECRET: KeyObject) {
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const data = hmac.update(JSON.stringify(reqBody));
  const gen_hmac = data.digest("hex");
  return "sha256=" + gen_hmac;
}
