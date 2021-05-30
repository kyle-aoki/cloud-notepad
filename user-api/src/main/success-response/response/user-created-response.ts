import { MessageObject } from "../types";

const UserCreatedResponse = (): MessageObject => ({
  message: "User successfully created."
});

export default UserCreatedResponse;
