
//获取文章列表
export interface articleList {
    data: {
        code: number;
        meta: Meta;
        data: Datum[];
    }

}

interface Datum {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    category: Category;
    image?: string;
}
export interface imageTp {
  
    data: {
        code: number,
        data:imageData
    }
}
//上传图片
interface imageData {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

interface Category {
    id: number;
    title: string;
}

interface Meta {
    current_page: number;
    page_row: string;
    total: number;
    total_page: number;
    categoryTotal:number
}
//查询文章
export interface queryArticle {

    data: Data;
}

interface Data {
    code: number
    data: articleInfo

}
interface articleInfo {

    id: number;
    title: string;
    content: string;
    categoryId: number;
    createdAt: string;
    updateAt: string;
    category: Category;
    image: string
}

//更新文章
export interface updateArticle {
    data: {
        code: number;
        data: Data;
    }

}

interface Data {
    message: string;
}