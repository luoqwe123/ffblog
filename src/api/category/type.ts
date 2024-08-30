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