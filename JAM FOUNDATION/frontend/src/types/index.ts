export type ArticleStateType = {
  articles: ArticleType[];
  singleArticle: ArticleType;
  loading: boolean;
  error: string;
  showModal: boolean;
};

export interface ContentItem {
  topic: string;
  description: string;
}

export type ArticleType = {
  _id?: string;
  title: string;
  titleUl: string;
  image: string | File;
  overview: string;
  content: { topic: string; description: string }[];
  author: string;
  dateCreated: string;
  [key: string]: string | File | ContentItem[] | undefined;
};

export type UserType = Record<
  'firstname' | 'lastname' | 'username' | 'photo' | 'email' | 'role',
  string
>;

export type UserStateType = {
  remove_auth_error: string;
  fetch_user_error: string;
  loading: boolean;
  isAuthenticated: boolean;
  authentication_error: string;
  user: UserType;

  imageFile: {
    file: File | undefined;
    filePreview: string | undefined;
  };
};
