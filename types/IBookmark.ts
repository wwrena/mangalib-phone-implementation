export interface IBookmark {
    id: number;
    manga_name: string;
    rus_name: string;
    slug: string;
    cover: string;
    created_at: string;
    updated_at: string;
    last_chapter_at: string;
    status: number;
    last_chapter: {
        id: number;
        name: string;
        number: string;
        volume: number;
    };
}
