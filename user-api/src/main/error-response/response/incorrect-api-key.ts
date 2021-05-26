import { ErrorMessageObject } from "../types";

const IncorrectApiKey = (): ErrorMessageObject => {
  const msg = `Incorrect API Key. You may obtain an api-key from the onboarding form on '/documentation'.`;
  return { message: msg, statusCode: 401 };
};

export default IncorrectApiKey;
