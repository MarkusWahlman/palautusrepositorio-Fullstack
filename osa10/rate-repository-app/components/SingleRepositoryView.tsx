import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ListRenderItem,
} from "react-native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import RepositoryItem from "@/components/RepositoryItem";
import { CustomText } from "@/components/CustomText";
import { FullRepository, Review } from "@/types/Repository";
import ReviewItem from "./ReviewItem";

const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

interface RepositoryData {
  repository: FullRepository;
}

interface SingleRepositoryViewProps {
  id: string;
}

const SingleRepositoryView = ({ id }: SingleRepositoryViewProps) => {
  const { data, loading, error } = useQuery<RepositoryData>(GET_REPOSITORY, {
    variables: { id: id! },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <CustomText>Error loading repository</CustomText>
      </View>
    );
  }

  const repository = data?.repository;
  const reviews: Review[] =
    repository?.reviews?.edges.map((edge) => edge.node) ?? [];

  const renderItem: ListRenderItem<Review> = ({ item }) => (
    <ReviewItem review={item} />
  );

  if (!repository) {
    return (
      <View style={styles.center}>
        <CustomText>Repository not found</CustomText>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <RepositoryItem {...repository} githubLink={repository.url} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default SingleRepositoryView;

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: "#e1e4e8",
    paddingBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
});
