import { SuccessMessageObject } from "../../types/response";

export default function UserCreatedResponse(): SuccessMessageObject {
  return { message: "User successfully created." };
}
