import Ajv, { JTDDataType } from "ajv/dist/jtd";
import createPayloadValidator from ".";

const ajv = new Ajv();

export const logInSchema = {
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
} as const;

type LogInSchema = JTDDataType<typeof logInSchema>;

const validator = ajv.compile<LogInSchema>(logInSchema);

const logInValidator = createPayloadValidator(validator);

export default logInValidator;
