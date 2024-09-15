export interface UserMessage {
    sender: 'User';
    message: string;
}

export interface AIMessage {
    sender: 'AI';
    message: string;
}

export type ChatMessage = UserMessage | AIMessage;

export interface SearchResult {
    explanation: string;
    search_title: string;
    similar_publications: Publication[];
}

export interface Publication {
    id: number;
    abstract: string|null;
    advisor: string|null;
    citations: string|null;
    department: string[];
    disciplines: string[];
    downloads: number;
    keywords: string[];
    title: string|null;
    url: string|null;
    year: number|null;
    downloadLink: string|null;
}