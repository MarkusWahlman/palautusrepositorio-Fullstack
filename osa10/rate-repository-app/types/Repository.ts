export interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

export interface FullRepository extends Repository {
  url: string;
  reviews?: {
    edges: {
      node: Review;
    }[];
  };
}

export interface Review {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
}
