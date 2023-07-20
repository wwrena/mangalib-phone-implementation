export interface IComment {
    id: number;
    comment: string;
    created_at: string;
    user: {
        id: number;
        avatar: string;
        username: string;
    };
    votes_up: number;
    votes_down: number;
}
