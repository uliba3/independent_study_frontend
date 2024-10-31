import { Publication } from "../types";

const SearchResultBox: React.FC<{ publications: Publication[], selectPublication: (publication: Publication) => void }> = ({ publications, selectPublication }) => {
    return (
        <div className='overflow-auto h-full'>
            {publications.map((publication, index) => (
                <div 
                    key={index} 
                    onClick={() => selectPublication(publication)} 
                    className='cursor-pointer rounded-md hover:shadow-md hover:bg-gray-200 h-12 flex items-center px-2 m-4'
                >
                    <div className="truncate ...">{publication.title}</div>
                </div>
            ))}
        </div>
    );
};

export default SearchResultBox;
