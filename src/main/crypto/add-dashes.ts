// Adds dashes every 4 characters to a password divisible by 4
export default function addDashes(password: string) {
  let passwordWithDashes = "";
  for (let i = 0; i < password.length; i += 1) {
    passwordWithDashes += password[i];
    if (i % 4 === 3 && i !== password.length - 1) passwordWithDashes += "-";
  }
  return passwordWithDashes;
}
