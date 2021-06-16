import Ajv, { JTDDataType } from "ajv/dist/jtd";
import createPayloadValidator from ".";

const ajv = new Ajv();

export const DeleteUserSchema = {
  properties: {
    password: { type: "string" },
  },
} as const;

type DeleteUserSchema = JTDDataType<typeof DeleteUserSchema>;

const validator = ajv.compile<DeleteUserSchema>(DeleteUserSchema);

const deleteUserPayloadValidator = createPayloadValidator(validator);

export default deleteUserPayloadValidator;
