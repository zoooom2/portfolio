export type ArticleStateType = {
  articles: ArticleType[];
  loading: boolean;
  error: string;
};

export type ArticleType = {
  title: string;
  titleUl: string;
  image: string;
  overview: string;
  content: { topic: string; description: string }[];
  author: string;
  dateCreated: string;
};
