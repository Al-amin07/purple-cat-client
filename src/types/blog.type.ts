export interface IBlog {
  _id: string;
  title: string;
  tags: string[];
  shortDescription: string;
  content: string;
  category: string;
  subcategory: string;
  author: {
    name: string;
    profilePicture: string;
  };
  publishedDate: Date;
  likes: number;
  views: number;
  isBookmarked: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
