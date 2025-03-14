import React, { useState } from 'react';

const ChatInput: React.FC<{onSendMessage: (message: string) => void}> = ({ onSendMessage }) => {
    const [inputMessage, setInputMessage] = useState('');

    const handleSend = () => {
        if(inputMessage.trim() !== '') {
            onSendMessage(inputMessage);
            setInputMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className='flex justify-center h-full items-center p-4 bg-gray-100'>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className='w-full focus:outline-none bg-gray-100 placeholder:italic'
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
            />
            <button onClick={handleSend}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xmlSpace="preserve">
                    <path id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394  l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393  C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z" />
                </svg>
            </button>
        </div>
    );
};

export default ChatInput;