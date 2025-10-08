import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("library-user-token");
  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }));
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
