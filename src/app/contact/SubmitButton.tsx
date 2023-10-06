import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton() {
  // we can only use useFormStatus in a child of the form element
  const formStatus = useFormStatus();
  const { pending } = formStatus;

  return (
    <button type="submit" className="btn" disabled={pending}>
      Submit
    </button>
  );
}
