import { ErrorMessageObject } from "../types";

const IncorrectApiKey = (): ErrorMessageObject => {
  const msg = `Incorrect API Key. You may obtain an api-key from the onboarding form on '/documentation'.`;
  return { statusCode: 401, message: msg };
};

export default IncorrectApiKey;
