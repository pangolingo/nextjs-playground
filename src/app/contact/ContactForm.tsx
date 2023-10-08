"use client";

import { useEffect, useRef, useState } from "react";
// todo: fix - react doesnt yet declare this ts type
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";

import clsx from "clsx";

import { useUser } from "@auth0/nextjs-auth0/client";
import ErrorMessages from "./ErrorMessages";
import SubmitButton from "./SubmitButton";
import submit, { PossibleFormStates } from "./actions";

export const hasError = (
  key: string,
  formState: PossibleFormStates
): boolean => {
  if (!("errors" in formState)) {
    return false;
  }
  return (formState.errors.messages[key] ?? []).length > 0;
};

const initialState = {};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function ContactForm() {
  const [formState, formAction] = useFormState(submit, initialState) as [
    PossibleFormStates,
    any
  ];
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);

  // nextjs server actions doesn't seem to give us a way to reset the form, so we have to do it manually
  useEffect(() => {
    if (!("success" in formState)) {
      return;
    }
    if (formRef.current) {
      formRef.current.reset();
    }
    setMessage("");
    setName("");
    setEmail("");
  }, [formState]);

  useEffect(() => {
    // fill in the name and email fields with user information (but only if they're blank)
    if (!user) {
      return;
    }
    setEmail((prevState) => {
      if (!prevState) {
        return user.email ?? "";
      }
      return prevState;
    });
    setName((prevState) => {
      if (!prevState) {
        return user.name ?? "";
      }
      return prevState;
    });
  }, [user]);

  return (
    <form className="space-y-4 max-w-[16rem]" action={formAction} ref={formRef}>
      {"errors" in formState && (
        <div className="message message--error">
          <p>Oops, we couldn&apos;t save the form.</p>
        </div>
      )}
      {"success" in formState && (
        <div className="message message--success">
          <p>Thanks! We&apos;ve received your message.</p>
        </div>
      )}

      <div className="input-container">
        <label htmlFor="f-name" className="input-label">
          Name
        </label>
        <div id="f-name-error-messages">
          <ErrorMessages formState={formState} field="name" />
        </div>
        <input
          type="text"
          name="name"
          id="f-name"
          className="input"
          required
          aria-invalid={hasError("name", formState)}
          aria-errormessage="f-name-error-messages"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label htmlFor="f-email" className="input-label">
          Email
        </label>
        <div id="f-email-error-messages">
          <ErrorMessages formState={formState} field="email" />
        </div>
        <input
          type="email"
          name="email"
          id="f-email"
          className="input"
          required
          aria-invalid={hasError("email", formState)}
          aria-errormessage="f-email-error-messages"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <fieldset className="input-container">
        <legend className="input-label">
          Who&apos;s your favorite starter pokemon?
        </legend>
        <div id="f-starters-error-messages">
          <ErrorMessages formState={formState} field="starters" />
        </div>
        <div>
          <input
            type="checkbox"
            name="starters"
            value="charmander"
            id="f-starters-charmander"
            aria-invalid={hasError("starters", formState)}
            aria-errormessage="f-starters-error-messages"
          />{" "}
          <label htmlFor="f-starters-charmander">Charmander</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="starters"
            value="squirtle"
            id="f-starters-squirtle"
            aria-invalid={hasError("starters", formState)}
            aria-errormessage="f-starters-error-messages"
          />{" "}
          <label htmlFor="f-starters-squirtle">Squirtle</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="starters"
            value="bulbasaur"
            id="f-starters-bulbasaur"
            aria-invalid={hasError("starters", formState)}
            aria-errormessage="f-starters-error-messages"
          />{" "}
          <label htmlFor="f-starters-bulbasaur">Bulbasaur</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="starters"
            value="pikachu"
            id="f-starters-pikachu"
            aria-invalid={hasError("starters", formState)}
            aria-errormessage="f-starters-error-messages"
          />{" "}
          <label htmlFor="f-starters-pikachu">Pikachu</label>
        </div>
      </fieldset>

      <div className="input-container">
        <label htmlFor="f-message" className="input-label">
          Message
        </label>
        <div id="f-message-error-messages">
          <ErrorMessages formState={formState} field="message" />
        </div>
        <textarea
          className="input"
          name="message"
          id="f-message"
          rows={3}
          aria-invalid={hasError("message", formState)}
          aria-errormessage="f-message-error-messages"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <span
          className={clsx("input-hint tabular-nums", {
            "text-red-700": message.length > 30,
          })}
        >
          {message.length}/30
        </span>
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
