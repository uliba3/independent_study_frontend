"use client";

import React, { useState } from 'react';
import { ChatMessage, SearchResult, Publication } from "../types";
import { searchPublications, askQuestion } from "@/utils/api";
import SearchResultBox from "@/components/searchResultBox";
import SelectedPublicationBox from "@/components/SelectedPublicationBox";
import ChatDisplay from "@/components/ChatDisplay";
import ChatInput from "@/components/ChatInput";

const initialSearchResult: SearchResult = {
  explanation: "",
  search_title: "",
  similar_publications: []
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResult>(initialSearchResult);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [publicationMessages, setPublicationMessages] = useState<ChatMessage[]>([]);

  const searchSendMessage = async (inputMessage: string) => {
    if (inputMessage.trim() !== '') {
      const response = await searchPublications(inputMessage);
      setMessages([{ sender: 'User', message: inputMessage }, { sender: 'AI', message: response.explanation }]);
      setSearchResult(response);
    }
  };

  const askSendMessage = async (inputMessage: string) => {
    if (inputMessage.trim() !== '' && selectedPublication) {
      const message = publicationMessages.length > 0 ? publicationMessages[publicationMessages.length - 1].message : '';
      const response = await askQuestion(message + '\n' + inputMessage, selectedPublication.id );
      setPublicationMessages([...publicationMessages, { sender: 'User', message: inputMessage }, { sender: 'AI', message: response }]);
    }
  };

  const unselectPublication = () => {
    setSelectedPublication(null);
    setPublicationMessages([]);
  };

  return (
    <>
      <div className='flex flex-row h-screen w-screen'>
        <div className='w-1/5 bg-neutral-300'>
          {searchResult.similar_publications.length > 0 ?
            <SearchResultBox publications={searchResult.similar_publications} selectPublication={setSelectedPublication} />
            : <div className='h-full w-full flex items-center justify-center p-16'>
              <p className='text-gray-500'>No publications found</p>
            </div>}
        </div>
        <div className='w-3/5 flex flex-col'>
          <div className='flex-[9] overflow-auto p-16 scrollbar-hide'>
            {selectedPublication ?
              publicationMessages.length > 0 ? <ChatDisplay messages={publicationMessages} /> : <div className='h-full w-full flex items-center justify-center'>
                <p className='text-gray-500'>No messages yet</p>
              </div>
              : messages.length > 0 ? <ChatDisplay messages={messages} /> : <div className='h-full w-full flex items-center justify-center'>
                <p className='text-gray-500'>No messages yet</p>
              </div>}
          </div>
          <div className='flex-[1]'>
            <ChatInput onSendMessage={selectedPublication ? askSendMessage : searchSendMessage} />
          </div>
        </div>
        <div className='w-1/5 bg-neutral-300'>
          {selectedPublication ?
            <SelectedPublicationBox selectedPublication={selectedPublication} unselectPublication={unselectPublication} />
            : <div className='h-full w-full flex items-center justify-center p-16'>
              <p className='text-gray-500'>Select a publication to start chatting</p>
            </div>}
        </div>
      </div>
    </>
  );
}
