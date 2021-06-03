import Ajv, { JTDDataType } from "ajv/dist/jtd";
import createValidatorFunction from ".";

const ajv = new Ajv();

const DeleteUserSchema = {
  properties: {
    password: { type: "string" }
  },
} as const;

type DeleteUserSchema = JTDDataType<typeof DeleteUserSchema>;

const validator = ajv.compile<DeleteUserSchema>(DeleteUserSchema);

const deleteUserValidator = createValidatorFunction(validator);

export default deleteUserValidator;
