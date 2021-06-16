import Ajv, { JTDDataType } from "ajv/dist/jtd";
import createPayloadValidator from ".";

const ajv = new Ajv();

export const createUserSchema = {
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
} as const;

type CreateUserSchema = JTDDataType<typeof createUserSchema>;

const validator = ajv.compile<CreateUserSchema>(createUserSchema);

const createUserValidator = createPayloadValidator(validator);

export default createUserValidator;
