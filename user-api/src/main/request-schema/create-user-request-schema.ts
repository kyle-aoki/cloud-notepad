// or ESM/TypeScript import
import Ajv from "ajv"

const ajv = new Ajv();

const createUserSchema = {
  type: "object",
  properties: {
    username: {type: "string"},
    password: {type: "string"}
  },
  required: ["username", "password"],
  additionalProperties: false,
}

const createUserValidator = ajv.compile(createUserSchema);

export default createUserValidator;
