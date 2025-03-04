
export interface state {
    articleList:articleInfo[],
    articleMeta:meta|Object,
    article:articleInfo|object
}

interface articleInfo {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    category: {
        id: number;
        title: string;
    }
}
interface meta{
    current_page: number;
    page_row: string;
    total: number;
    total_page: number;
}