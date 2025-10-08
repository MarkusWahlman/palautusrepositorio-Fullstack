import { useState, type FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";

type LoginFormProps = {
  show: boolean;
  setToken: (token: string) => void;
};

type LoginResponse = {
  login: {
    value: string;
  };
};

const LoginForm = ({ setToken, show }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { error }] = useMutation<LoginResponse>(LOGIN, {
    onError: (error) => {},
  });

  if (!show) {
    return null;
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await login({ variables: { username, password } });
    const token = result.data?.login.value;
    if (token) {
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      {error && <p style={{ color: "red" }}>Login failed</p>}
    </div>
  );
};

export default LoginForm;
