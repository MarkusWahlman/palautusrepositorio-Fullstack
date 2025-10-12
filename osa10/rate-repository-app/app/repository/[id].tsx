import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ListRenderItem,
} from "react-native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams } from "expo-router";
import RepositoryItem from "@/components/RepositoryItem";
import { CustomText } from "@/components/CustomText";
import { format } from "date-fns";
import { FullRepository, Review } from "@/types/Repository";

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

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { text, rating, createdAt, user } = review;
  const formattedDate = format(new Date(createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <CustomText style={styles.ratingText}>{rating}</CustomText>
      </View>
      <View style={styles.reviewContent}>
        <CustomText style={styles.username}>{user.username}</CustomText>
        <CustomText style={styles.date}>{formattedDate}</CustomText>
        <CustomText style={styles.reviewText}>{text}</CustomText>
      </View>
    </View>
  );
};

export default function SingleRepositoryView() {
  const { id } = useLocalSearchParams<{ id: string }>();

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
}

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
  reviewContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0366d6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    color: "#586069",
    marginBottom: 6,
  },
  reviewText: {
    color: "#24292e",
  },
});
