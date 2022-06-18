export interface PostAuthor {
    id: string;
    displayName: string;
    photoURL: string | null;
}

export interface Post {
    id: string;
    date: string;
    author: PostAuthor;
    title: string;
    enTitle: string;
    content: string[];
    enContent: string[];
    likes: number;
}

export interface PostDoc {
    id: string;
    displayName: string;
    photoURL: string | null;
    date: string;
    title: string;
    enTitle: string;
    content: string[];
    enContent: string[];
    likes: number;
}