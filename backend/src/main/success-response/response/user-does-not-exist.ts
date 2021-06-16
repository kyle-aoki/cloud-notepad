import { SuccessMessageObject } from "../../types/response";

export default function UserDoesNotExist(): SuccessMessageObject {
  return { message: "User does not exist." };
}
