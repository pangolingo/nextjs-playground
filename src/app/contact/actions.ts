"use server";

import { saveMessage } from "@/lib/database/messages";
import { ErrorResponse, joiErrorsToMessages } from "@/lib/validation";
import { ContactFormSchema, ExpectedFormData } from "@/lib/validation/contact";
import { getSession } from "@auth0/nextjs-auth0";
import Joi from "joi";

export interface FormErrorState {
  errors: ErrorResponse<ExpectedFormData>;
}
export interface FormSuccessstate {
  success: true;
}

export type PossibleFormStates = FormErrorState | FormSuccessstate;

export default async function submit(
  prevState: PossibleFormStates,
  formData: FormData
): Promise<PossibleFormStates> {
  console.log("formdata", JSON.stringify(formData));
  console.log("preveState", JSON.stringify(prevState));

  const session = await getSession();

  const formValues: ErrorResponse<ExpectedFormData>["values"] = {
    name: formData.get("name"),
    message: formData.get("message"),
    email: formData.get("email"),
    starters: formData.getAll("starters"),
  };

  const { error: validationError, value: sanitizedFormValues } =
    ContactFormSchema.validate(formValues, { abortEarly: false });

  if (Joi.isError(validationError)) {
    const errors: ErrorResponse<ExpectedFormData> = {
      messages: joiErrorsToMessages(validationError),
      values: formValues,
    };

    return { errors };
  }

  await saveMessage({
    userId: session?.user?.sub ?? null,
    name: sanitizedFormValues.name,
    email: sanitizedFormValues.email,
    message: sanitizedFormValues.message,
    starters: sanitizedFormValues.starters,
  });

  return { success: true };
}
