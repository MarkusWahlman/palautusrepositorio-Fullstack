import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";

type Page = "authors" | "books" | "add" | "login" | "recommended";

const App = () => {
  const [page, setPage] = useState<Page>("authors");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("library-user-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} isLoggedIn={!!token} />
      <Books show={page === "books"} />
      {token && (
        <>
          <NewBook show={page === "add"} />
          <Recommended show={page === "recommended"} />
        </>
      )}
      {!token && <LoginForm show={page === "login"} setToken={setToken} />}
    </div>
  );
};

export default App;
