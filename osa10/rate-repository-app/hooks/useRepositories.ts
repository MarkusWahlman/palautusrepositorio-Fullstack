import { Repository } from "@/types/Repository";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          fullName
          id
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

interface RepositoriesData {
  repositories: {
    edges: {
      node: Repository;
    }[];
  };
}

const useRepositories = () => {
  const { data, loading, refetch } = useQuery<RepositoriesData>(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const repositories: Repository[] | undefined = data
    ? data.repositories.edges.map((edge) => edge.node)
    : undefined;

  return { repositories, loading, refetch };
};

export default useRepositories;
