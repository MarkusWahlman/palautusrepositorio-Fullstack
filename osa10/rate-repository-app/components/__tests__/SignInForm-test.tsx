import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import SignInForm from "../SignInForm";

jest.mock("@/hooks/useSignIn", () => ({
  __esModule: true,
  default: () => [jest.fn()],
}));

describe("SignInForm", () => {
  it("calls onSignIn with correct values when form is submitted", async () => {
    const mockOnSignIn = jest.fn();

    render(<SignInForm onSignIn={mockOnSignIn} />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.changeText(usernameInput, "testuser");
    fireEvent.changeText(passwordInput, "password123");

    const submitButton = screen.getByText("Sign in");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockOnSignIn).toHaveBeenCalledTimes(1);
      expect(mockOnSignIn).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
      });
    });
  });
});
