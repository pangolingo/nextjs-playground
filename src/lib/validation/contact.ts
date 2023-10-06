import Joi from "joi";

export interface ExpectedFormData {
  name: string | File | null;
  message: string | File | null;
  email: string | File | null;
  starters: Array<string | File> | null;
}

export const ContactFormSchema = Joi.object({
  name: Joi.string().required().trim().label("Name"),
  message: Joi.string().required().trim().max(30).label("Message"),
  email: Joi.string().trim().required().email().label("Email"),
  starters: Joi.array()
    .required()
    .min(1)
    .unique()
    .label("Starter Pokemon")
    .items(
      Joi.string()
        .valid("charmander", "squirtle", "bulbasaur", "pikachu")
        .label("Starter Pokemon")
    )
    .custom((startersValue: string[], helpers) => {
      if (startersValue.length === 1 && startersValue[0] === "pikachu") {
        return helpers.message({
          custom: "If you select Pikachu you must pick another one too",
        });
      }
      return startersValue;
    })
    .custom((startersValue: string[], helpers) => {
      if (startersValue.filter((s) => s !== "pikachu").length > 1) {
        return helpers.message({
          custom: "You can only select one starter pokemon besides Pikachu",
        });
      }
      return startersValue;
    }),
});
