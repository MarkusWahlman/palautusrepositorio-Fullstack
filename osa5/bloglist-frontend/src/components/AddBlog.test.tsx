import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, vi } from "vitest";
import AddBlog from "./AddBlog";

vi.mock("../services/blogs", () => {
  return {
    default: {
      create: vi.fn().mockResolvedValue({
        id: "12345",
        title: "Timon Päiväkirja",
        author: "Timo Virtanen",
        url: "https://timovirtanen.com",
        likes: 0,
      }),
    },
  };
});

vi.mock("../hooks/useAuth", () => {
  return {
    useAuth: () => ({
      user: { id: "u1", token: "ben", name: "Timo Virtanen" },
    }),
  };
});

test("calls onBlogAdded with the created blog when form is submitted", async () => {
  const handleBlogAdded = vi.fn();
  const user = userEvent.setup();

  render(<AddBlog onBlogAdded={handleBlogAdded} />);

  await user.type(screen.getByLabelText("Title"), "Timon Päiväkirja");
  await user.type(screen.getByLabelText("Author"), "Timo Virtanen");
  await user.type(screen.getByLabelText("URL"), "https://timovirtanen.com");

  await user.click(screen.getByRole("button", { name: "Add Blog" }));

  expect(handleBlogAdded).toHaveBeenCalledTimes(1);
  expect(handleBlogAdded).toHaveBeenCalledWith(
    expect.objectContaining({
      title: "Timon Päiväkirja",
      author: "Timo Virtanen",
      url: "https://timovirtanen.com",
      likes: 0,
    }),
  );
});
