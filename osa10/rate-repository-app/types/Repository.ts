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

export interface ReviewBase {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
}

export interface MyReview extends ReviewBase {
  repository: {
    id: string;
    fullName: string;
  };
}

export interface Review extends ReviewBase {
  user: {
    id: string;
    username: string;
  };
}
