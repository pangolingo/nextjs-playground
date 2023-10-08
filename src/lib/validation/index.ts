import type { ValidationError } from "joi";

type ErrorMessageList = Record<string, string[]>;

export interface ErrorResponse<T> {
  messages: ErrorMessageList;
  values: T;
}

export const joiErrorsToMessages = (
  error: ValidationError | undefined
): ErrorMessageList => {
  if (!error) {
    return {};
  }
  const messages: ErrorMessageList = {};
  error.details.forEach((detail) => {
    const key = detail.path[0];
    if (!key) {
      return;
    }
    if (key in messages) {
      messages[key].push(detail.message);
    } else {
      messages[key] = [detail.message];
    }
  });
  return messages;
};
