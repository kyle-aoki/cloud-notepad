import { MessageObject } from "../types";

export default function SuccessfullyDeletedUser(): MessageObject {
  return { message: "User has been deleted." };
}
