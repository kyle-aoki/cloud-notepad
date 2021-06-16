import { createHeaderValidatorFunction, HeaderType, HeaderValidator, RequiredHeaderSchema } from ".";

const deleteUserHeaders: RequiredHeaderSchema = {
  username: HeaderType.string,
  session_token: HeaderType.string,
};

const authorizationHeaderValidator: HeaderValidator = createHeaderValidatorFunction(deleteUserHeaders);

export default authorizationHeaderValidator;
