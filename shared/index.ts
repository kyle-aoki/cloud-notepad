export enum GenericError {
  SOMETHING_WENT_WRONG = "SOMETHING_WENT_WRONG",
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

  FILENAME_MISSING = "FILENAME_MISSING",
  FILEPATH_MISSING = "FILEPATH_MISSING",
  FILE_CONTENT_MISSING = "FILE_CONTENT_MISSING",
}

export enum LogInResponse {
  SUCCESSFUL_LOG_IN = "SUCCESSFUL_LOG_IN",
  INCORRECT_UN_OR_PW = "INCORRECT_UN_OR_PW",
}

export enum FileResponse {
  FILE_SAVED = "FileResponse.FILE_SAVED",
  FILE_SENT = "FileResponse.FILE_SENT",
  FILE_ALREADY_EXISTS = "FileResponse.FILE_ALREADY_EXISTS",
  USER_DIR_SENT = "FileResponse.USER_DIR_SENT",
  FILE_DELETED = "FileResponse.FILE_DELETED",
  FILE_NOT_EXIST = "FileResponse.FILE_NOT_EXIST",
}
