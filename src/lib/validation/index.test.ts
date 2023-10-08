import { describe, it, expect } from "vitest";
import Joi from "joi";
import { joiErrorsToMessages } from ".";

describe("joiErrorsToMessages", () => {
  it("shows no messages if there are no errors", () => {
    const TestJoiSchema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
    });
    const { error } = TestJoiSchema.validate(
      {
        name: "Dave",
        age: 22,
      },
      { abortEarly: false }
    );

    const result = joiErrorsToMessages(error);
    expect(result).toMatchObject({});
  });

  it("returns messages for errors", () => {
    const TestJoiSchema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required().max(100),
      colors: Joi.array().required().items(Joi.string(), Joi.string()),
    });
    const { error } = TestJoiSchema.validate(
      {
        name: false,
        colors: [1, 2],
      },
      { abortEarly: false }
    );
    const result = joiErrorsToMessages(error);
    expect(result).toMatchObject({
      name: ['"name" must be a string'],
      age: ['"age" is required'],
      colors: [
        '"colors[0]" does not match any of the allowed types',
        '"colors[1]" does not match any of the allowed types',
      ],
    });
  });
});
