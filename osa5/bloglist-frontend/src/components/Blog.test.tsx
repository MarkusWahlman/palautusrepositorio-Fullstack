import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("../hooks/useAuth", () => {
  return {
    useAuth: () => ({
      user: {
        id: "u1",
        token: "ben",
        name: "Timo Virtanen",
        username: "timovirtanen",
      },
    }),
  };
});

const blog = {
  id: "12345",
  user: {
    id: "u1",
    token: "ben",
    name: "Timo Virtanen",
    username: "timovirtanen",
  },
  title: "Timon Päiväkirja",
  author: "Timo Virtanen",
  likes: 995672,
  url: "https://timovirtanen.com",
};

test("renders title but not url or likes by default", () => {
  const handleDelete = vi.fn();

  render(<Blog blog={blog} onDelete={handleDelete} />);

  expect(screen.getByText(blog.title)).toBeDefined();
  expect(screen.queryByText(blog.url)).toBeNull();
  expect(screen.queryByText(blog.likes.toString())).toBeNull();
});

test("shows url and likes after clicking 'Show more'", async () => {
  const handleDelete = vi.fn();
  const user = userEvent.setup();

  render(<Blog blog={blog} onDelete={handleDelete} />);

  const button = screen.getByText("Show more");
  await user.click(button);

  expect(screen.getByText(blog.url, { exact: false })).toBeDefined();
  expect(
    screen.getByText(blog.likes.toString(), { exact: false }),
  ).toBeDefined();
});

test("calls onLike twice when like button is clicked twice", async () => {
  const handleLike = vi.fn();
  const handleDelete = vi.fn();
  const user = userEvent.setup();

  render(<Blog blog={blog} onLike={handleLike} onDelete={handleDelete} />);

  const showButton = screen.getByText("Show more");
  await user.click(showButton);

  const likeButton = screen.getByText("Like");

  vi.mock("../services/blogs", () => {
    return {
      default: {
        like: vi.fn().mockResolvedValue({}),
      },
    };
  });

  await user.click(likeButton);
  await user.click(likeButton);

  expect(handleLike).toHaveBeenCalledTimes(2);
});
