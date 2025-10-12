import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import RepositoryItem from "./RepositoryItem";
import { Repository } from "../types/Repository";
import useRepositories, {
  OrderBy,
  OrderDirection,
} from "@/hooks/useRepositories";
import { useRouter } from "expo-router";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    backgroundColor: "white",
    padding: 10,
  },
  picker: {
    height: 50,
    color: "#24292e",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const router = useRouter();

  const [orderBy, setOrderBy] = useState<OrderBy>("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState<OrderDirection>("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearch] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearch,
  });

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
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <RepositoryListHeader
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          orderBy={orderBy}
          orderDirection={orderDirection}
          setOrderBy={setOrderBy}
          setOrderDirection={setOrderDirection}
        />
      }
    />
  );
};

interface RepositoryListHeaderProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  orderBy: OrderBy;
  orderDirection: OrderDirection;
  setOrderBy: (value: OrderBy) => void;
  setOrderDirection: (value: OrderDirection) => void;
}

const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  orderBy,
  orderDirection,
  setOrderBy,
  setOrderDirection,
}: RepositoryListHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />

      <Picker
        selectedValue={`${orderBy}_${orderDirection}`}
        style={styles.picker}
        onValueChange={(value) => {
          switch (value) {
            case "CREATED_AT_DESC":
              setOrderBy("CREATED_AT");
              setOrderDirection("DESC");
              break;
            case "RATING_AVERAGE_DESC":
              setOrderBy("RATING_AVERAGE");
              setOrderDirection("DESC");
              break;
            case "RATING_AVERAGE_ASC":
              setOrderBy("RATING_AVERAGE");
              setOrderDirection("ASC");
              break;
            default:
              setOrderBy("CREATED_AT");
              setOrderDirection("DESC");
          }
        }}
      >
        <Picker.Item label="Latest repositories" value="CREATED_AT_DESC" />
        <Picker.Item
          label="Highest rated repositories"
          value="RATING_AVERAGE_DESC"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="RATING_AVERAGE_ASC"
        />
      </Picker>
    </View>
  );
};

export default RepositoryList;
