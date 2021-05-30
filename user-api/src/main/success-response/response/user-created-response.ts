import { MessageObject } from "../types";

export default function UserCreatedResponse(): MessageObject {
  return { message: "User successfully created." };
}
