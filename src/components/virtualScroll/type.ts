// types.ts
export interface Article {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    category: {
      title: string;
    };
    image: string;
  }
  
  export interface ArticleResponse {
    data: Article[];
  }