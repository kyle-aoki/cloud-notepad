import Ajv, {JTDDataType} from "ajv/dist/jtd"

const ajv = new Ajv();

const createUserSchema = {
  properties: {
    username: {type: "string"},
    password: {type: "string"}
  }
} as const;

type CreateUserSchema = JTDDataType<typeof createUserSchema>;

const createUserValidator = ajv.compile<CreateUserSchema>(createUserSchema);

export default createUserValidator;
