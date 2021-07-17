"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileResponse = exports.DeleteUserResponse = exports.LogInResponse = exports.PayloadValidationResponse = exports.ValidationResponse = exports.CheckUsernameResponse = exports.AuthError = exports.GenericError = void 0;
var GenericError;
(function (GenericError) {
    GenericError["SOMETHING_WENT_WRONG"] = "GenericError.SOMETHING_WENT_WRONG";
    GenericError["NETWORK_ERROR"] = "GenericError.NETWORK_ERROR";
})(GenericError = exports.GenericError || (exports.GenericError = {}));
var AuthError;
(function (AuthError) {
    AuthError["UNAUTHORIZED"] = "AuthError.UNAUTHORIZED";
})(AuthError = exports.AuthError || (exports.AuthError = {}));
var CheckUsernameResponse;
(function (CheckUsernameResponse) {
    CheckUsernameResponse["USER_EXISTS"] = "CheckUsernameResponse.USER_EXISTS";
    CheckUsernameResponse["USER_DOES_NOT_EXIST"] = "CheckUsernameResponse.USER_DOES_NOT_EXIST";
})(CheckUsernameResponse = exports.CheckUsernameResponse || (exports.CheckUsernameResponse = {}));
var ValidationResponse;
(function (ValidationResponse) {
    ValidationResponse["USERNAME_MISSING"] = "ValidationResponse.USERNAME_MISSING";
    ValidationResponse["PASSWORD_MISSING"] = "ValidationResponse.PASSWORD_MISSING";
    ValidationResponse["INVALID_USERNAME_SYMBOLS"] = "ValidationResponse.INVALID_USERNAME_SYMBOLS";
    ValidationResponse["USERNAME_SHORT"] = "ValidationResponse.USERNAME_SHORT";
    ValidationResponse["USERNAME_LONG"] = "ValidationResponse.USERNAME_LONG";
    ValidationResponse["INVALID_PASSWORD_SYMBOLS"] = "ValidationResponse.INVALID_PASSWORD_SYMBOLS";
    ValidationResponse["PASSWORD_SHORT"] = "ValidationResponse.PASSWORD_SHORT";
    ValidationResponse["PASSWORD_LONG"] = "ValidationResponse.PASSWORD_LONG";
})(ValidationResponse = exports.ValidationResponse || (exports.ValidationResponse = {}));
var PayloadValidationResponse;
(function (PayloadValidationResponse) {
    PayloadValidationResponse["PASSWORD_MISSING"] = "PayloadValidationResponse.PASSWORD_MISSING";
    PayloadValidationResponse["USERNAME_MISSING"] = "PayloadValidationResponse.USERNAME_MISSING";
    PayloadValidationResponse["NOT_LOGGED_IN"] = "PayloadValidationResponse.NOT_LOGGED_IN";
    PayloadValidationResponse["FILENAME_MISSING"] = "PayloadValidationResponse.FILENAME_MISSING";
    PayloadValidationResponse["FILEPATH_MISSING"] = "PayloadValidationResponse.FILEPATH_MISSING";
    PayloadValidationResponse["FILE_CONTENT_NOT_STRING"] = "PayloadValidationResponse.FILE_CONTENT_NOT_STRING";
})(PayloadValidationResponse = exports.PayloadValidationResponse || (exports.PayloadValidationResponse = {}));
var LogInResponse;
(function (LogInResponse) {
    LogInResponse["SUCCESSFUL_LOG_IN"] = "LogInResponse.SUCCESSFUL_LOG_IN";
    LogInResponse["INCORRECT_UN_OR_PW"] = "LogInResponse.INCORRECT_UN_OR_PW";
})(LogInResponse = exports.LogInResponse || (exports.LogInResponse = {}));
var DeleteUserResponse;
(function (DeleteUserResponse) {
    DeleteUserResponse["INCORRECT_PASSWORD"] = "DeleteUserResponse.INCORRECT_PASSWORD";
    DeleteUserResponse["FAILED_TO_DELETE_USER"] = "DeleteUserResponse.FAILED_TO_DELETE_USER";
})(DeleteUserResponse = exports.DeleteUserResponse || (exports.DeleteUserResponse = {}));
var FileResponse;
(function (FileResponse) {
    FileResponse["FILE_SAVED"] = "FileResponse.FILE_SAVED";
    FileResponse["FILE_SENT"] = "FileResponse.FILE_SENT";
    FileResponse["FILE_ALREADY_EXISTS"] = "FileResponse.FILE_ALREADY_EXISTS";
    FileResponse["USER_DIR_SENT"] = "FileResponse.USER_DIR_SENT";
    FileResponse["FILE_DELETED"] = "FileResponse.FILE_DELETED";
    FileResponse["FILE_NOT_EXIST"] = "FileResponse.FILE_NOT_EXIST";
})(FileResponse = exports.FileResponse || (exports.FileResponse = {}));
