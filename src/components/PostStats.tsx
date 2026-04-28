import { useState } from "react";

const ThumbsUpOutline = ({ active }: { active?: boolean }) => (
  <svg
    className={`w-[18px] h-[18px] inline-block -mt-0.5 cursor-pointer transition-colors ${active ? "text-black fill-current" : "text-[#5c5c5c] hover:text-black fill-none stroke-current"}`}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  </svg>
);

const BookmarkOutline = ({ active }: { active?: boolean }) => (
  <svg
    className={`w-[18px] h-[18px] inline-block -mt-0.5 cursor-pointer transition-colors ${active ? "text-black fill-current" : "text-[#5c5c5c] hover:text-black fill-none stroke-current"}`}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const EyeOutline = () => (
  <svg 
    className="w-[18px] h-[18px] inline-block -mt-0.5 text-[#5c5c5c] fill-none stroke-current" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export const PostStats = () => {
  const [likes, setLikes] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? Math.max(0, likes - 1) : likes + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="w-full flex flex-col font-sans mb-8">
      <div className="w-full h-px bg-[#e0e0e0] mb-4"></div>
      <div className="flex items-center gap-6 text-[14px] text-[#5c5c5c]">
        
        {/* Likes */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={handleLike}>
          <ThumbsUpOutline active={isLiked} />
          <span className={`select-none ${isLiked ? "text-black" : "group-hover:text-black"}`}>
            {likes === 1 ? "1 person liked this" : `${likes} people liked this`}
          </span>
        </div>

        {/* Views */}
        <div className="flex items-center gap-2 select-none">
          <EyeOutline />
          <span>1739 Views</span>
        </div>

        {/* Save for later */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={handleSave}>
          <BookmarkOutline active={isSaved} />
          <span className={`select-none ${isSaved ? "text-black" : "group-hover:text-black"}`}>
            Save for later
          </span>
        </div>

      </div>
    </div>
  );
};
