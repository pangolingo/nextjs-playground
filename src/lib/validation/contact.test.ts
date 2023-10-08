import { describe, it, expect } from "vitest";
import { ContactFormSchema } from "./contact";

const VALID_INPUT = {
  name: "Dave",
  email: "daveiverson@thoughtbot.com",
  starters: ["charmander", "pikachu"],
  message: "Hello!",
};

describe("ContactFormSchema", () => {
  it("is valid when the expect contact form info is passed", () => {
    const { error } = ContactFormSchema.validate(VALID_INPUT, {
      abortEarly: false,
    });

    expect(error).toBeUndefined();
  });

  it("is invalid when required fields are missing", () => {
    const { error } = ContactFormSchema.validate({}, { abortEarly: false });

    expect(error?.details.map((d) => d.message)).toEqual([
      '"Name" is required',
      '"Message" is required',
      '"Email" is required',
      '"Starter Pokemon" is required',
    ]);
  });

  it("is invalid when an unexpected starter is passed", () => {
    const { error } = ContactFormSchema.validate(
      {
        ...VALID_INPUT,
        starters: ["articuno"],
      },
      { abortEarly: false }
    );

    expect(error?.details.map((d) => d.message)).toEqual([
      '"Starter Pokemon" must be one of [charmander, squirtle, bulbasaur, pikachu]',
    ]);
  });

  it("is invalid when only pikachu is selected", () => {
    const { error } = ContactFormSchema.validate(
      {
        ...VALID_INPUT,
        starters: ["pikachu"],
      },
      { abortEarly: false }
    );

    expect(error?.details.map((d) => d.message)).toEqual([
      "If you select Pikachu you must pick another one too",
    ]);
  });

  it("is invalid when more than one non-pikachu starter is selected", () => {
    const { error } = ContactFormSchema.validate(
      {
        ...VALID_INPUT,
        starters: ["charmander", "bulbasaur"],
      },
      { abortEarly: false }
    );

    expect(error?.details.map((d) => d.message)).toEqual([
      "You can only select one starter pokemon besides Pikachu",
    ]);
  });

  it("is invalid when the message is too long", () => {
    const { error } = ContactFormSchema.validate(
      {
        ...VALID_INPUT,
        message:
          "Hello! This is a very long message that should definitely cause an error.",
      },
      { abortEarly: false }
    );

    expect(error?.details.map((d) => d.message)).toEqual([
      '"Message" length must be less than or equal to 30 characters long',
    ]);
  });
});
