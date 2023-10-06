// import { experimental_useFormState as useFormState } from "react-dom";
// import { ErrorResponse } from "@/lib/validation";
// import { ExpectedFormData } from "@/lib/validation/contact";
// import submit from "./actions";
// import SubmitButton from "./SubmitButton";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <>
      <h2 className="h2 mb-2">Contact me</h2>
      <ContactForm />
    </>
  );
}
