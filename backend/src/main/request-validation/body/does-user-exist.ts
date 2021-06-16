import Ajv, { JTDDataType } from "ajv/dist/jtd";
import createPayloadValidator from ".";

const ajv = new Ajv();

export const DoesUserExistSchema = {
  properties: {
    username: { type: "string" },
  },
} as const;

type DoesUserExistSchema = JTDDataType<typeof DoesUserExistSchema>;

const validator = ajv.compile<DoesUserExistSchema>(DoesUserExistSchema);

const doesUserExistValidator = createPayloadValidator(validator);

export default doesUserExistValidator;
