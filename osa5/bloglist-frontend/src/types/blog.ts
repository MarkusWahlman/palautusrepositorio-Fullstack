import type { UserDataType } from "./user";

interface BlogBase {
  title: string;
  author: string;
  likes: number;
  url: string;
}

export type NewBlogType = BlogBase;

export interface BlogDataType extends BlogBase {
  id: string;
  user: UserDataType;
}
