import AuthStorageContext from "@/context/authStorageContext";
import { gql } from "@apollo/client";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { useContext } from "react";

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

interface SignInArgs {
  username: string;
  password: string;
}

interface AuthenticateData {
  authenticate: {
    accessToken: string;
  };
}

type UseSignInReturn = [
  (args: SignInArgs) => Promise<{ data?: AuthenticateData }>,
  useMutation.Result<AuthenticateData>
];

const useSignIn = (): UseSignInReturn => {
  const [mutate, result] = useMutation<AuthenticateData>(AUTHENTICATE);

  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const signIn = async ({ username, password }: SignInArgs) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    const accessToken = data?.authenticate.accessToken;

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
    }

    await apolloClient.resetStore();

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
