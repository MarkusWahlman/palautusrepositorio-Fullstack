import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { Repository } from "../types/Repository";
import useRepositories from "@/hooks/useRepositories";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const router = useRouter();
  const { repositories } = useRepositories();

  const renderItem = ({ item }: { item: Repository }) => (
    <Pressable onPress={() => router.push(`/repository/${item.id}`)}>
      <RepositoryItem {...item} />
    </Pressable>
  );

  return (
    <FlatList
      data={repositories}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
