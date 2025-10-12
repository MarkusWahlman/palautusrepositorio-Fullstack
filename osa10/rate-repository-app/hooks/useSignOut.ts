import { useApolloClient } from "@apollo/client/react";
import AuthStorageContext from "@/context/authStorageContext";
import { useContext } from "react";

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const signOut = async () => {
    await authStorage.removeAccessToken();

    await apolloClient.resetStore();
  };

  return signOut;
};

export default useSignOut;
