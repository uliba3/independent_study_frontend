import { SearchResult } from '../types';
import { mockSearchResult, mockAnswer } from '../mock/mock_response';

export async function searchPublications(message: string): Promise<SearchResult> {
    // Replace this URL with your actual API endpoint
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/search';
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
        return mockSearchResult;
    }

    try {
        if (!apiUrl) {
            throw new Error('API URL is not defined');
        }

        const url = new URL(apiUrl);
        console.log(url);
        url.searchParams.append('query', message);
        console.log(url);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

export async function askQuestion(message: string, id: number): Promise<string> {
    // Replace this URL with your actual API endpoint
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/ask';
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
        return mockAnswer + id.toString();
    }

    try {
        if (!apiUrl) {
            throw new Error('API URL is not defined');
        }

        const url = new URL(apiUrl);
        url.searchParams.append('query', message);
        url.searchParams.append('id', id.toString());
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}