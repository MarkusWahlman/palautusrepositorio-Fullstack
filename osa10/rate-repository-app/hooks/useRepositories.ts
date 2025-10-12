import { Repository } from "@/types/Repository";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export interface RepositoriesData {
  repositories: {
    edges: {
      node: Repository;
    }[];
  };
}

export type OrderBy = "CREATED_AT" | "RATING_AVERAGE";
export type OrderDirection = "ASC" | "DESC";

export interface UseRepositoriesVariables {
  orderBy?: OrderBy;
  orderDirection?: OrderDirection;
  searchKeyword?: string;
}

const useRepositories = (variables?: UseRepositoriesVariables) => {
  const { data, loading, refetch, error } = useQuery<
    RepositoriesData,
    UseRepositoriesVariables
  >(GET_REPOSITORIES, {
    variables: {
      orderBy: variables?.orderBy ?? "CREATED_AT",
      orderDirection: variables?.orderDirection ?? "DESC",
      searchKeyword: variables?.searchKeyword ?? "",
    },
    fetchPolicy: "cache-and-network",
  });

  const repositories: Repository[] =
    data?.repositories?.edges?.map((edge) => edge.node) ?? [];

  return { repositories, loading, refetch, error };
};

export default useRepositories;
