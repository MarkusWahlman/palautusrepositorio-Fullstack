import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import AuthStorage from "./authStorage";

const httpLink = new HttpLink({ uri: process.env.EXPO_PUBLIC_APOLLO_URI });

export const createApolloClient = (authStorage: AuthStorage) => {
  const authLink = new SetContextLink(async (prevContext, operation) => {
    try {
      const accessToken = await authStorage.getAccessToken();

      return {
        headers: {
          ...prevContext.headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          ...prevContext.headers,
        },
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};
