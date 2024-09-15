'use client';

import React, { useState, useEffect } from 'react';
import { Publication } from '../types';

const SelectedPublicationBox: React.FC<{ selectedPublication: Publication, unselectPublication: () => void }> = ({ selectedPublication, unselectPublication }) => {
    const [isExpandedAbstract, setIsExpandedAbstract] = useState(false);
    
    // Reset isExpandedAbstract when selectedPublication changes
    useEffect(() => {
        setIsExpandedAbstract(false);
    }, [selectedPublication]);

    const labelClassName = 'inline-flex items-center rounded bg-gray-50 p-2 text-sm text-gray-600 ring-1 ring-inset ring-gray-500/10';
    console.log(selectedPublication);
    return (
        <div className='overflow-auto h-full p-4 scrollbar-hide'>
            <button type='button' onClick={unselectPublication}>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div>
                {selectedPublication.url ? <div className='font-bold text-2xl hover:underline'><a href={selectedPublication.url} target='_blank'>{selectedPublication.title}</a></div> : <div className='font-bold text-2xl'>{selectedPublication.title}</div>}
                <div>
                    {selectedPublication.advisor && <div className={labelClassName}>{selectedPublication.advisor}</div>}
                    {selectedPublication.disciplines && selectedPublication.disciplines.map((discipline, index) => <div key={index} className={labelClassName}>{discipline}</div>)}
                    {selectedPublication.keywords && selectedPublication.keywords.map((keyword, index) => <div key={index} className={labelClassName}>{keyword}</div>)}
                    {selectedPublication.year && <div className={labelClassName}>{selectedPublication.year}</div>}
                    {selectedPublication.downloads > 0 && <div className={labelClassName}>{selectedPublication.downloads} downloads</div>}
                    {selectedPublication.downloadLink && <div className={labelClassName + ' hover:underline'}><a href={selectedPublication.downloadLink} target='_blank'>pdf</a></div>}
                </div>
                <div onClick={() => setIsExpandedAbstract(!isExpandedAbstract)} className='cursor-pointer hover:underline'>Abstract</div>
                {isExpandedAbstract && <div>{selectedPublication.abstract}</div>}
            </div>
        </div>
    );
}

export default SelectedPublicationBox;