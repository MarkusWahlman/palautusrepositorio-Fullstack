import { expect, test } from "@playwright/test";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByLabel("Username:")).toBeVisible();
    await expect(page.getByLabel("Password:")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test.describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("Username:").fill("mluukkai");
      await page.getByLabel("Password:").fill("salainen");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("Username:").fill("mluukkai");
      await page.getByLabel("Password:").fill("wrongpassword");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("wrong username or password")).toBeVisible();

      await expect(
        page.getByText("Matti Luukkainen logged in")
      ).not.toBeVisible();
    });
  });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByLabel("Username:").fill("mluukkai");
      await page.getByLabel("Password:").fill("salainen");
      await page.getByRole("button", { name: "Login" }).click();

      await page.getByRole("button", { name: "new form" }).click();
      await page.getByLabel("title").fill("Test Blog");
      await page.getByLabel("author").fill("Tester");
      await page.getByLabel("url").fill("http://testurl.com");
      await page.getByRole("button", { name: "Add Blog" }).click();

      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new form" }).click();

      await page.getByLabel("title").fill("Timon Päiväkirja");
      await page.getByLabel("author").fill("Timo Virtanen");
      await page.getByLabel("url").fill("http://timovirtanen.com");

      await page.getByRole("button", { name: "Add Blog" }).click();

      await expect(
        page.getByRole("heading", { name: "Timon Päiväkirja" })
      ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "Show more" }).click();

      const likes = page.getByText(/Likes/);
      await expect(likes).toContainText("0");

      await page.getByRole("button", { name: "Like" }).click();

      await expect(likes).toContainText("1");
    });

    test("the user who added a blog can delete it", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "Test Blog" })
      ).toBeVisible();

      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        await dialog.accept();
      });

      await page.getByRole("button", { name: "Delete" }).click();

      await expect(
        page.getByRole("heading", { name: "Test Blog" })
      ).not.toBeVisible();
    });

    test("only the user who added a blog sees the delete button", async ({
      page,
      request,
    }) => {
      await page.getByRole("button", { name: "Show more" }).click();
      await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();

      await page.getByRole("button", { name: "logout" }).click();

      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Timo Virtanen",
          username: "timovirtanen",
          password: "salasana",
        },
      });

      await page.getByLabel("Username:").fill("timovirtanen");
      await page.getByLabel("Password:").fill("salasana");
      await page.getByRole("button", { name: "Login" }).click();

      await page.getByRole("button", { name: "Show more" }).click();

      await expect(
        page.getByRole("button", { name: "Delete" })
      ).not.toBeVisible();
    });
    test("blogs are ordered by likes, most liked first", async ({ page }) => {
      await page.getByRole("button", { name: "new form" }).click();
      await page.getByLabel("title").fill("First Blog");
      await page.getByLabel("author").fill("Author1");
      await page.getByLabel("url").fill("http://first.com");
      await page.getByRole("button", { name: "Add Blog" }).click();

      await page.getByRole("button", { name: "new form" }).click();
      await page.getByLabel("title").fill("Second Blog");
      await page.getByLabel("author").fill("Author2");
      await page.getByLabel("url").fill("http://second.com");
      await page.getByRole("button", { name: "Add Blog" }).click();

      const firstShowMore = page
        .getByRole("button", { name: "Show more" })
        .nth(0);
      const secondShowMore = page
        .getByRole("button", { name: "Show more" })
        .nth(1);
      await firstShowMore.click();
      await secondShowMore.click();

      const secondLikeButton = page
        .getByRole("button", { name: "Like" })
        .nth(1);
      await secondLikeButton.click();
      await secondLikeButton.click();

      await expect(page.getByText(/Likes/).nth(1)).toContainText("2");

      const blogs = page.locator("div", { has: page.getByRole("heading") });

      await expect(blogs.first()).toContainText("Second Blog");
      await expect(blogs.nth(1)).toContainText("First Blog");
    });
  });
});
