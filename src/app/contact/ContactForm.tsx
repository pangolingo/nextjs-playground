"use client";

import { ErrorResponse } from "@/lib/validation";
import { ExpectedFormData } from "@/lib/validation/contact";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { useState } from "react";
// todo: fix - react doesnt yet declare this ts type
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import { POST } from "./submit/route";

const errorsList = (
  key: string,
  formState: { errors: ErrorResponse<ExpectedFormData> }
): string[] => {
  return formState?.errors?.messages[key] ?? [];
};
const hasError = (
  key: string,
  formState: { errors: ErrorResponse<ExpectedFormData> }
): boolean => {
  return (formState?.errors?.messages[key] ?? []).length > 0;
};

const initialState = {};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function ContactForm() {
  const [formState, formAction] = useFormState(POST, initialState);
  const [message, setMessage] = useState("");
  const { pending } = useFormStatus();
  return (
    <form
      className="space-y-4 max-w-[16rem]"
      action={formAction}
      // use:enhance={() => {
      //   submitting = true;

      //   return ({ update }) => {
      //     update().then(() => (submitting = false));
      //   };
      // }}
    >
      {/* {#if form?.errors}
    <div className="message message--error">
      <p>Oops, we couldn't save the form.</p>
    </div>
  {/if}
  {#if form?.success}
    <div className="message message--success">
      <p>Thanks! We've received your message.</p>
    </div>
  {/if} */}

      <div className="input-container">
        <label htmlFor="f-name" className="input-label">
          Name
        </label>
        <div id="f-name-error-messages">
          {/* {#each errorsList('name', form) ?? [] as message}
        <p className="input-error-message">{message}</p>
      {/each} */}
        </div>
        <input
          type="text"
          name="name"
          id="f-name"
          className="input"
          required
          aria-invalid={hasError("name", formState)}
          // bind:value={name}
          aria-errormessage="f-name-error-messages"
        />
      </div>

      <div className="input-container">
        <label htmlFor="f-email" className="input-label">
          Email
        </label>
        <div id="f-email-error-messages">
          {/* {#each errorsList('email', form) ?? [] as message}
        <p className="input-error-message">{message}</p>
      {/each} */}
        </div>
        <input
          type="email"
          name="email"
          id="f-email"
          className="input"
          required
          aria-invalid={hasError("email", formState)}
          // bind:value={email}
          aria-errormessage="f-email-error-messages"
        />
      </div>

      <fieldset className="input-container">
        <legend className="input-label">
          Who&apos;s your favorite starter pokemon?
        </legend>
        <div id="f-starters-error-messages">
          {/* {#each errorsList('starters', form) ?? [] as message}
        <p className="input-error-message">{message}</p>
      {/each} */}
        </div>
        <div>
          <input
            type="checkbox"
            name="starters"
            value="charmander"
            // bind:group={starters}
            id="f-starters-charmander"
            aria-invalid={hasError("starters", formState)}
            aria-errormessage="f-starters-error-messages"
          />
          <label htmlFor="f-starters-charmander">Charmander</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="starters"
            value="squirtle"
            // bind:group={starters}
            id="f-starters-squirtle"
            aria-invalid={hasError("starters", formState)}
            aria-errormessage="f-starters-error-messages"
          />
          <label htmlFor="f-starters-squirtle">Squirtle</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="starters"
            value="bulbasaur"
            // bind:group={starters}
            id="f-starters-bulbasaur"
            aria-invalid={hasError("starters", formState)}
            aria-errormessage="f-starters-error-messages"
          />
          <label htmlFor="f-starters-bulbasaur">Bulbasaur</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="starters"
            value="pikachu"
            // bind:group={starters}
            id="f-starters-pikachu"
            aria-invalid={hasError("starters", formState)}
            aria-errormessage="f-starters-error-messages"
          />
          <label htmlFor="f-starters-pikachu">Pikachu</label>
        </div>
      </fieldset>

      <div className="input-container">
        <label htmlFor="f-message" className="input-label">
          Message
        </label>
        <div id="f-message-error-messages">
          {/* {#each errorsList('message', form) ?? [] as message}
        <p className="input-error-message">{message}</p>
      {/each} */}
        </div>
        <textarea
          className="input"
          name="message"
          id="f-message"
          rows={3}
          aria-invalid={hasError("message", formState)}
          aria-errormessage="f-message-error-messages"
          required
          // bind:value={message}
        />
        <span
          className="input-hint tabular-nums"
          // class:text-red-700={message.length > 30}
        >
          {message.length}/30
        </span>
      </div>

      <div>
        <button type="submit" className="btn" disabled={pending}>
          Submit
        </button>
      </div>
    </form>
  );
}
