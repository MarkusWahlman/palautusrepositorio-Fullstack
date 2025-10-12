import { Link, useRouter } from "expo-router";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { CustomText } from "./CustomText";
import useSignOut from "@/hooks/useSignOut";
import useCurrentUser from "@/hooks/useCurrentUser";

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

const AppBar = () => {
  const { user } = useCurrentUser();

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
            <Link href="/myreviews" asChild>
              <Pressable style={styles.link}>
                <CustomText style={styles.text}>My Reviews</CustomText>
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
