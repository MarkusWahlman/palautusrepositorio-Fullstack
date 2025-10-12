import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { MyReview } from "@/types/Repository";

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;

export interface MeData {
  me: {
    id: string;
    username: string;
    reviews?: {
      edges: {
        node: MyReview;
      }[];
    };
  } | null;
}

const useCurrentUser = (includeReviews = false) => {
  const { data, loading, error, refetch } = useQuery<MeData>(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews },
  });

  return {
    user: data?.me,
    loading,
    error,
    refetch,
  };
};

export default useCurrentUser;
