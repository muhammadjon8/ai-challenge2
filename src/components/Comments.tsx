import { useState } from "react";

type CommentAuthor = {
  name: string;
  avatarUrl?: string;
  isCurrentUser?: boolean;
};

type CommentType = {
  id: string;
  author: CommentAuthor;
  text: string;
  date: string;
  likes: number;
  isEdited?: boolean;
  timestamp: number;
  isNew?: boolean;
  likedByCurrentUser?: boolean;
  parentId?: string;
};

const currentUserAvatar =
  "https://ui-avatars.com/api/?name=You&background=0D8ABC&color=fff";

const initialComments: CommentType[] = [
  {
    id: "1",
    author: {
      name: "Olga Chekhova",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    text: `It's a great way to keep track of your contributions and recognize your efforts.`,
    date: "18/03/2026",
    likes: 5,
    isEdited: false,
    timestamp: new Date("2026-03-18T09:30:00").getTime(),
  },
  {
    id: "2",
    author: {
      name: "Sergey Pavlov",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    text: `If you think your score is incorrect, please reach out before the leaderboard is finalized. The easiest way is to submit a correction request using the form linked in the pinned announcement. Errors are usually resolved within 2 business days.`,
    date: "15/03/2026",
    likes: 3,
    isEdited: false,
    timestamp: new Date("2026-03-15T14:00:00").getTime(),
  },
  {
    id: "3",
    author: {
      name: "Elena Morozova",
      avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    text: `Great effort from everyone this quarter! University Partnership contributions grew by nearly 40% compared to Q3. Keep it up — those sessions genuinely make a difference for students looking to break into tech.`,
    date: "10/03/2026",
    likes: 8,
    isEdited: false,
    timestamp: new Date("2026-03-10T11:00:00").getTime(),
  },
  {
    id: "4",
    author: {
      name: "Andrey Kuznetsov",
      avatarUrl: "https://randomuser.me/api/portraits/men/57.jpg",
    },
    text: `Note: repeated activities (marked with "repeat" in the name) are scored at half the original points value. This is intentional — it encourages variety across contribution types rather than repeating the same session multiple times.`,
    date: "05/03/2026",
    likes: 4,
    isEdited: false,
    timestamp: new Date("2026-03-05T08:45:00").getTime(),
  },
];

const ThumbsUpIcon = ({ active }: { active?: boolean }) => (
  <svg
    className={`w-3.5 h-3.5 inline-block -mt-0.5 cursor-pointer transition-colors ${active ? "text-black" : "text-gray-500 hover:text-black"}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M2 20h4V9H2v11zm19-10.5c0-1.1-.9-2-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L12 1 5.46 7.54c-.29.29-.46.69-.46 1.11V18c0 1.1.9 2 2 2h8.5c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.5z" />
  </svg>
);

export const Comments = () => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [filter, setFilter] = useState<"Newest" | "Oldest" | "Popular">("Newest");
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyValue, setReplyValue] = useState("");

  const topLevelComments = comments.filter(c => !c.parentId);
  const sortedComments = [...topLevelComments].sort((a, b) => {
    if (filter === "Newest") return b.timestamp - a.timestamp;
    if (filter === "Oldest") return a.timestamp - b.timestamp;
    if (filter === "Popular") return b.likes - a.likes;
    return 0;
  });

  const handleAddCommentClick = () => {
    if (newComment.trim()) {
      const date = new Date();
      const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      
      const newC: CommentType = {
        id: Date.now().toString(),
        author: { name: "You", isCurrentUser: true, avatarUrl: currentUserAvatar },
        text: newComment,
        date: formattedDate,
        likes: 0,
        timestamp: Date.now(),
        isNew: true,
      };
      setComments([newC, ...comments]);
      setNewComment("");
      setIsInputFocused(false);
    }
  };

  const handleReplySubmit = (parentId: string) => {
    if (replyValue.trim()) {
      const date = new Date();
      const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      
      const newC: CommentType = {
        id: Date.now().toString(),
        author: { name: "You", isCurrentUser: true, avatarUrl: currentUserAvatar },
        text: replyValue,
        date: formattedDate,
        likes: 0,
        timestamp: Date.now(),
        isNew: true,
        parentId,
      };
      setComments([...comments, newC]);
      setReplyValue("");
      setReplyingToId(null);
    }
  };

  const handleEditStart = (comment: CommentType) => {
    setEditingId(comment.id);
    setEditValue(comment.text);
  };

  const handleDelete = (id: string) => {
    // Delete comment and its replies
    setComments(comments.filter((c) => c.id !== id && c.parentId !== id));
  };

  const handleSaveEdit = (id: string) => {
    if (!editValue.trim()) {
      handleDelete(id);
      return;
    }
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, text: editValue, isEdited: true } : c
      )
    );
    setEditingId(null);
  };

  const handleLike = (id: string) => {
    setComments(
      comments.map((c) => {
        if (c.id === id) {
          const isLiked = c.likedByCurrentUser;
          return {
            ...c,
            // Only add 1 to previous count if not liked, or subtract 1 if already liked
            likes: isLiked ? Math.max(0, c.likes - 1) : c.likes + 1,
            likedByCurrentUser: !isLiked,
          };
        }
        return c;
      })
    );
  };

  const renderComment = (comment: CommentType, isReply = false) => {
    return (
      <div key={comment.id} className="flex gap-4">
        <img
          src={comment.author.avatarUrl}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full mt-1 shrink-0"
        />
        
        <div className="flex-1">
          {editingId === comment.id ? (
            // Edit Mode
            <div className="flex flex-col">
              <div className="relative">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full h-10 pl-3 pr-8 bg-white border border-gray-300 rounded outline-none"
                  autoFocus
                />
                {editValue && (
                  <button 
                    onClick={() => setEditValue("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="bg-[#c93b3b] hover:bg-[#b03030] text-white px-5 py-1.5 text-sm rounded font-medium transition-colors">
                  Delete
                </button>
                <button
                  onClick={() => handleSaveEdit(comment.id)}
                  className="bg-[#8c8c8c] hover:bg-[#7a7a7a] text-white px-5 py-1.5 text-sm rounded font-medium transition-colors">
                  Save
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#202020] text-[15px]">
                    {comment.author.name}
                  </span>
                  {comment.isNew && (
                    <span className="bg-[#333333] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <span className="text-[#8c8c8c] text-[13px]">{comment.date}</span>
              </div>

              <div className="text-[#333333] text-[14px] whitespace-pre-wrap leading-relaxed">
                {comment.text}
              </div>

              <div className="flex items-center gap-2 mt-2 text-[#8c8c8c] text-[13px]">
                {!isReply && (
                  <>
                    <span 
                      className="cursor-pointer hover:underline"
                      onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                    >
                      Reply
                    </span>
                    <span>·</span>
                  </>
                )}
                <span 
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleLike(comment.id)}
                >
                  {comment.likes} <ThumbsUpIcon active={comment.likedByCurrentUser} />
                </span>
                {comment.author.isCurrentUser && (
                  <>
                    <span>·</span>
                    <span 
                      className="cursor-pointer hover:underline"
                      onClick={() => handleEditStart(comment)}
                    >
                      Edit
                    </span>
                  </>
                )}
                {comment.isEdited && (
                  <>
                    <span>-</span>
                    <span className="italic text-[#a0a0a0] text-xs">
                      Edited {comment.date}
                    </span>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const showSendButton = isInputFocused || newComment.length > 0;

  return (
    <div className="w-full max-w-[1200px] mt-12 mb-24 px-4 md:px-0 mx-auto font-sans">
      {/* Add Comment Section */}
      <div className="flex gap-4 mb-8">
        <img
          src={currentUserAvatar}
          alt="You"
          className="w-10 h-10 rounded-full shrink-0"
        />
        <div className="flex-1 flex flex-col gap-2">
          <div className="relative w-full">
            {/* Triangle pointer */}
            <div className="absolute top-[14px] left-[-6px] w-3 h-3 bg-white border-t border-l border-gray-300 transform -rotate-45 z-10" />
            
            {/* Input wrapper */}
            <div className="relative z-0 flex items-center bg-white border border-gray-300" style={{ borderRadius: '1px' }}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCommentClick();
                  }
                }}
                placeholder="Add a comment"
                className="flex-1 h-[42px] px-3 bg-transparent outline-none text-[14px] text-black"
              />
              {newComment && (
                <button 
                  onClick={() => setNewComment("")}
                  className="px-3 flex items-center justify-center text-gray-400 hover:text-gray-600 outline-none"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10 3.636 5.05l1.414-1.414L10 8.586z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {showSendButton && (
            <div className="flex justify-end mt-1">
              <button
                onClick={handleAddCommentClick}
                className="bg-[#2b2b2b] hover:bg-[#2b2b2b] text-white px-7 py-2 text-[13px] font-semibold transition-none outline-none"
                style={{ borderRadius: '1px' }}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-300 mb-6">
        {["Newest", "Oldest", "Popular"].map((tab) => (
          <div
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`pb-2 cursor-pointer text-[15px] font-medium transition-colors ${
              filter === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"
            }`}>
            {tab}
          </div>
        ))}
      </div>

      {/* Comments List */}
      <div className="flex flex-col">
        {sortedComments.map((comment, index) => {
          const replies = comments.filter(c => c.parentId === comment.id).sort((a,b) => a.timestamp - b.timestamp);
          
          return (
            <div key={comment.id} className="flex flex-col">
              <div className="flex flex-col gap-4 py-6">
                {renderComment(comment, false)}
                
                {/* Replies */}
                {replies.length > 0 && (
                  <div className="flex flex-col gap-4 ml-6 md:ml-14">
                    {replies.map(reply => renderComment(reply, true))}
                  </div>
                )}

                {/* Reply Input */}
                {replyingToId === comment.id && (
                  <div className="flex gap-4 ml-6 md:ml-14 mt-2">
                    <img
                      src={currentUserAvatar}
                      alt="You"
                      className="w-10 h-10 rounded-full shrink-0"
                    />
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="relative z-0 flex items-center bg-white border border-gray-300" style={{ borderRadius: '1px' }}>
                        <input
                          type="text"
                          value={replyValue}
                          onChange={(e) => setReplyValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleReplySubmit(comment.id);
                            }
                          }}
                          placeholder="Write a reply..."
                          className="flex-1 h-[42px] px-3 bg-transparent outline-none text-[14px] text-black"
                          autoFocus
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-1">
                        <button
                          onClick={() => setReplyingToId(null)}
                          className="bg-[#c93b3b] hover:bg-[#b03030] text-white px-5 py-1.5 text-sm rounded font-medium transition-colors"
                          style={{ borderRadius: '1px' }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReplySubmit(comment.id)}
                          className="bg-[#2b2b2b] hover:bg-[#2b2b2b] text-white px-7 py-1.5 text-sm font-semibold transition-none outline-none"
                          style={{ borderRadius: '1px' }}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Divider */}
              {index < sortedComments.length - 1 && (
                <div className="w-full h-px bg-gray-200" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
