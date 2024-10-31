import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';

const ChatDisplay: React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    {message.sender === 'User' ?
                        <div className='text-right m-8'>{message.message}</div>
                        : <div className='text-left'>
                            <ReactMarkdown>{message.message}</ReactMarkdown>
                        </div>}
                </div>
            ))}
        </div>
    );
};

export default ChatDisplay;