export enum GenericError {
  NETWORK_ERROR = "NETWORK_ERROR",
}

export enum CheckUsernameResponse {
  USER_EXISTS = "USER_EXISTS",
  USER_DOES_NOT_EXIST = "USER_DOES_NOT_EXIST",
}

export enum ValidationResponse {
  USERNAME_MISSING = "USERNAME_MISSING",
  PASSWORD_MISSING = "PASSWORD_MISSING",

  INVALID_USERNAME_SYMBOLS = "INVALID_USERNAME_SYMBOLS",
  USERNAME_SHORT = "USERNAME_SHORT",
  USERNAME_LONG = "USERNAME_LONG",

  INVALID_PASSWORD_SYMBOLS = "INVALID_PASSWORD_SYMBOLS",
  PASSWORD_SHORT = "PASSWORD_SHORT",
  PASSWORD_LONG = "PASSWORD_LONG",
}

export enum PayloadValidationResponse {
  PASSWORD_MISSING = "PASSWORD_MISSING",
  USERNAME_MISSING = "USERNAME_MISSING",
  NOT_LOGGED_IN = "NOT_LOGGED_IN",
}

export enum LogInResponse {
  SUCCESSFUL_LOG_IN = "SUCCESSFUL_LOG_IN",
  INCORRECT_UN_OR_PW = "INCORRECT_UN_OR_PW",
}