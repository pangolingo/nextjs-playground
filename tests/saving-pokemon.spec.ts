// import 'dotenv/config';
import { test, expect } from "@playwright/test";

test.describe("when logged out", () => {
  test.skip("trying to save pokemon shows an error", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: "Check out all the pokemons!" })
      .click();
    await page.getByRole("link", { name: "#4 charmander" }).click();
    await page.getByRole("button", { name: "Save pokemon" }).click();
    await expect(
      page.getByText("Please log in to save this pokemon.")
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Save pokemon" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Remove saved pokemon" })
    ).not.toBeVisible();
  });

  test.skip("the API route returns unauthorized", async ({ request }) => {
    const apiPokemon = await request.get("/pokemon/favorites");
    expect(apiPokemon.status()).toBe(401);
    expect(await apiPokemon.json()).toEqual({
      unauthorized: true,
    });
  });
});

test.describe("when logged in as a user", () => {
  // use logged in user state
  test.use({ storageState: "playwright/.auth/user.json" });

  test.skip("saving and unsaving pokemon", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("link", { name: "Check out all the pokemons!" })
      .click();
    await page.getByRole("link", { name: "#4 charmander" }).click();
    await page.getByRole("button", { name: "Save pokemon" }).click();
    await expect(page.getByText("Saved!")).toBeVisible();

    // saved pokemon appears on the homepage and list page
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "❤️ #4 charmander" })
    ).toBeVisible();
    await page.goto("/pokemon");
    await expect(
      page.getByRole("link", { name: "❤️ #4 charmander" })
    ).toBeVisible();

    // unsaving
    await page.getByRole("link", { name: "❤️ #4 charmander" }).click();
    await page.getByRole("button", { name: "Remove saved pokemon" }).click();
    await expect(page.getByText("Unsaved!")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Save pokemon" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Remove saved pokemon" })
    ).not.toBeVisible();

    // pokemon no longer appears on other pages
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "❤️ #4 charmander" })
    ).not.toBeVisible();
    await page.goto("/pokemon");
    await expect(
      page.getByRole("link", { name: "❤️ #4 charmander" })
    ).not.toBeVisible();
    await expect(
      page.getByRole("link", { name: "#4 charmander" })
    ).toBeVisible();
  });

  test.skip(" the API route shows saved pokemon", async ({ page, request }) => {
    await page.goto("/pokemon");
    await page.getByRole("link", { name: "#4 charmander" }).click();
    await page.getByRole("button", { name: "Save pokemon" }).click();
    await expect(page.getByText("Saved!")).toBeVisible();

    // saved pokemon appears in the API
    let apiPokemon = await request.get("/pokemon/favorites");
    expect(apiPokemon.ok()).toBeTruthy();
    expect(await apiPokemon.json()).toEqual(
      expect.objectContaining({
        favoritePokemon: expect.arrayContaining([
          {
            id: expect.anything(),
            pokemon_name: "charmander",
            pokemon_id: 4,
          },
        ]),
      })
    );

    // unsaving
    await page.goto("/pokemon");
    await page.getByRole("link", { name: "❤️ #4 charmander" }).click();
    await page.getByRole("button", { name: "Remove saved pokemon" }).click();
    await expect(page.getByText("Unsaved!")).toBeVisible();

    // pokemon no longers appears in the API
    apiPokemon = await request.get("/pokemon/favorites");
    expect(apiPokemon.ok()).toBeTruthy();
    expect(await apiPokemon.json()).toEqual(
      expect.objectContaining({
        favoritePokemon: [],
      })
    );
  });
});
