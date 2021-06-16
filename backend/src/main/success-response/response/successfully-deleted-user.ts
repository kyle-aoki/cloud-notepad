import { SuccessMessageObject } from "../../types/response";

export default function SuccessfullyDeletedUser(): SuccessMessageObject {
  return { message: "User has been deleted." };
}
