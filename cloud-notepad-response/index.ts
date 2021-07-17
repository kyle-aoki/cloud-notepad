export enum GenericError {
  SOMETHING_WENT_WRONG = "GenericError.SOMETHING_WENT_WRONG",
  NETWORK_ERROR = "GenericError.NETWORK_ERROR",
}

export enum AuthError {
  UNAUTHORIZED = "AuthError.UNAUTHORIZED",
}

export enum CheckUsernameResponse {
  USER_EXISTS = "CheckUsernameResponse.USER_EXISTS",
  USER_DOES_NOT_EXIST = "CheckUsernameResponse.USER_DOES_NOT_EXIST",
}

export enum ValidationResponse {
  USERNAME_MISSING = "ValidationResponse.USERNAME_MISSING",
  PASSWORD_MISSING = "ValidationResponse.PASSWORD_MISSING",

  INVALID_USERNAME_SYMBOLS = "ValidationResponse.INVALID_USERNAME_SYMBOLS",
  USERNAME_SHORT = "ValidationResponse.USERNAME_SHORT",
  USERNAME_LONG = "ValidationResponse.USERNAME_LONG",

  INVALID_PASSWORD_SYMBOLS = "ValidationResponse.INVALID_PASSWORD_SYMBOLS",
  PASSWORD_SHORT = "ValidationResponse.PASSWORD_SHORT",
  PASSWORD_LONG = "ValidationResponse.PASSWORD_LONG",
}

export enum PayloadValidationResponse {
  PASSWORD_MISSING = "PayloadValidationResponse.PASSWORD_MISSING",
  USERNAME_MISSING = "PayloadValidationResponse.USERNAME_MISSING",
  NOT_LOGGED_IN = "PayloadValidationResponse.NOT_LOGGED_IN",

  FILENAME_MISSING = "PayloadValidationResponse.FILENAME_MISSING",
  FILEPATH_MISSING = "PayloadValidationResponse.FILEPATH_MISSING",
  FILE_CONTENT_NOT_STRING = "PayloadValidationResponse.FILE_CONTENT_NOT_STRING",
}

export enum LogInResponse {
  SUCCESSFUL_LOG_IN = "LogInResponse.SUCCESSFUL_LOG_IN",
  INCORRECT_UN_OR_PW = "LogInResponse.INCORRECT_UN_OR_PW",
}

export enum DeleteUserResponse {
  INCORRECT_PASSWORD = "DeleteUserResponse.INCORRECT_PASSWORD",
  FAILED_TO_DELETE_USER = "DeleteUserResponse.FAILED_TO_DELETE_USER",
}

export enum FileResponse {
  FILE_SAVED = "FileResponse.FILE_SAVED",
  FILE_SENT = "FileResponse.FILE_SENT",
  FILE_ALREADY_EXISTS = "FileResponse.FILE_ALREADY_EXISTS",
  USER_DIR_SENT = "FileResponse.USER_DIR_SENT",
  FILE_DELETED = "FileResponse.FILE_DELETED",
  FILE_NOT_EXIST = "FileResponse.FILE_NOT_EXIST",
}
