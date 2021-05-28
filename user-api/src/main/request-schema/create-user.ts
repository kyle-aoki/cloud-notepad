import Ajv, { JTDDataType } from "ajv/dist/jtd";
import createValidatorFunction from ".";

const ajv = new Ajv();

const createUserSchema = {
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
} as const;

type CreateUserSchema = JTDDataType<typeof createUserSchema>;

const validator = ajv.compile<CreateUserSchema>(createUserSchema);

const createUserValidator = createValidatorFunction(validator);

export default createUserValidator;
