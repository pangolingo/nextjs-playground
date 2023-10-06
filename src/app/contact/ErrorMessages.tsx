import { PossibleFormStates } from "./actions";

export const errorsList = (
  key: string,
  formState: PossibleFormStates
): string[] => {
  if (!("errors" in formState)) {
    return [];
  }
  return formState.errors.messages[key] ?? [];
};

interface Props {
  formState: PossibleFormStates;
  field: string;
}

export default function ErrorMessages({ formState, field }: Props) {
  return (
    <>
      {errorsList(field, formState).map((errorMessage) => (
        <p key={errorMessage} className="input-error-message">
          {errorMessage}
        </p>
      ))}
    </>
  );
}
