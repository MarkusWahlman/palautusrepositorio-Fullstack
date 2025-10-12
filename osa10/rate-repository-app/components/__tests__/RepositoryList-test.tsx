import { render } from "@testing-library/react-native";

import RepositoryList from "@/app/index";
import { Repository } from "@/types/Repository";

jest.mock("@/hooks/useRepositories", () => ({
  __esModule: true,
  default: (): { repositories: Repository[] } => ({
    repositories: [
      {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
      },
      {
        id: "async-library.react-async",
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
      },
    ],
  }),
}));

describe("RepositoryList", () => {
  test("renders repository information correctly", () => {
    const screen = render(<RepositoryList />);

    const repositoryItems = screen.getAllByTestId("repositoryItem");
    expect(repositoryItems).toHaveLength(2);

    const [firstRepository, secondRepository] = repositoryItems;

    expect(firstRepository).toHaveTextContent(/jaredpalmer\/formik/); // Fullname
    expect(firstRepository).toHaveTextContent(
      /Build forms in React, without the tears/
    ); // Description
    expect(firstRepository).toHaveTextContent(/TypeScript/); //Language
    expect(firstRepository).toHaveTextContent(/21.9k/); // Stars
    expect(firstRepository).toHaveTextContent(/1.6k/); // Forks
    expect(firstRepository).toHaveTextContent(/88/); // Rating
    expect(firstRepository).toHaveTextContent(/3/); // Review

    expect(secondRepository).toHaveTextContent(/async-library\/react-async/); // Fullname
    expect(secondRepository).toHaveTextContent(
      /Flexible promise-based React data loader/
    ); // Description
    expect(secondRepository).toHaveTextContent(/JavaScript/); //Language
    expect(secondRepository).toHaveTextContent(/1.8k/); // Stars
    expect(secondRepository).toHaveTextContent(/69/); // Forks
    expect(secondRepository).toHaveTextContent(/72/); // Rating
    expect(secondRepository).toHaveTextContent(/3/); // Review
  });
});
