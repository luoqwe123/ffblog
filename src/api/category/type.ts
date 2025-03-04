export interface categoryList {
    data: {
        code: number;
        data: Datum[];
    }

}

interface Datum {
    id: number;
    title: string;
}
export interface category {
    data: {
        code: number;
        data: Data;
    }

}
interface Data {
    id: number;
    title: string;
    articles: Article[];
}

interface Article {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    createdAt: string;
    updateAt: string;
    image: string;
}
