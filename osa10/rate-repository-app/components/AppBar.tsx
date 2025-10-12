import { Link, useRouter } from "expo-router";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { CustomText } from "./CustomText";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import useSignOut from "@/hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#24292e",
    padding: 20,
  },
  scroll: {
    flexDirection: "row",
  },
  link: {
    marginRight: 20,
  },
  text: { color: "white" },
});

const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export interface MeData {
  me: {
    id: string;
    username: string;
  } | null;
}

const AppBar = () => {
  const { data } = useQuery<MeData>(ME, {
    fetchPolicy: "cache-and-network",
  });
  const user = data?.me;

  const signOut = useSignOut();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.navigate("/signin");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <Link href="/" asChild>
          <Pressable style={styles.link}>
            <CustomText style={styles.text}>Repositories</CustomText>
          </Pressable>
        </Link>
        {user ? (
          <>
            <Link href="/review" asChild>
              <Pressable style={styles.link}>
                <CustomText style={styles.text}>Create Review</CustomText>
              </Pressable>
            </Link>
            <Pressable onPress={handleSignOut} style={styles.link}>
              <CustomText style={styles.text}>Sign out</CustomText>
            </Pressable>
          </>
        ) : (
          <>
            <Link href="/signin" asChild>
              <Pressable style={styles.link}>
                <CustomText style={styles.text}>Sign in</CustomText>
              </Pressable>
            </Link>
            <Link href="/signup" asChild>
              <Pressable style={styles.link}>
                <CustomText style={styles.text}>Sign Up</CustomText>
              </Pressable>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
