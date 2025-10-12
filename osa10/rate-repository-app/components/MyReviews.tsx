import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import useCurrentUser from "@/hooks/useCurrentUser";
import { CustomText } from "./CustomText";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { user, loading } = useCurrentUser(true);

  if (loading) {
    return <CustomText>Loading...</CustomText>;
  }

  const reviews = user?.reviews?.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
