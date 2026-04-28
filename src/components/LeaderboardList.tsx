import { useState } from "react";

// Icons
const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
const ChevronUp = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);
const StarBlue = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}>
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);
const PresentationIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <rect x="3" y="3" width="18" height="13" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="16" x2="12" y2="21"></line>
  </svg>
);
const EducationIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);
const SmileIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

export type Activity = {
  id: string;
  name: string;
  category: string;
  date: string;
  quarter: string; // Q1, Q2, Q3, Q4
  points: number;
};

export type ListUser = {
  id: string;
  rank: number;
  name: string;
  title: string;
  avatarUrl?: string;
  initials?: string;
  score: number;
  presentationCount?: number;
  educationCount?: number;
  smileCount?: number;
  activities: Activity[];
};

// No local mock users needed anymore as they are passed via props

const LeaderboardRow = ({ user }: { user: ListUser }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-md border mb-4 transition-all duration-300 ${expanded ? "border-sky-500" : "border-slate-200"}`}>
      {/* Top Main Row */}
      <div
        className="flex items-center p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(!expanded)}>
        <div className="w-8 md:w-12 text-center text-slate-400 font-bold text-base md:text-xl">
          {user.rank}
        </div>

        {/* Avatar */}
        <div className="ml-2 mr-3 md:ml-4 md:mr-4">
          <img
            src={
              user.avatarUrl ||
              "https://ventionteamsinc.sharepoint.com/sites/edu/_layouts/15/userphoto.aspx?size=L&accountname=veranika.rybachonak%40ventionteams.com"
            }
            alt={user.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 text-base md:text-lg">{user.name}</h3>
          <p className="text-slate-500 text-xs md:text-sm truncate">{user.title}</p>
        </div>

        {/* Stats & Icons - desktop only inline */}
        <div className="hidden md:flex items-center gap-6 mr-6 text-sky-500">
          {user.educationCount !== undefined && (
            <div className="relative group flex flex-col items-center">
              <EducationIcon className="w-5 h-5 mb-1" />
              <span className="text-xs font-semibold text-slate-500">
                {user.educationCount}
              </span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#dfdfe4] text-black text-[11px] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                Education
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#dfdfe4]" />
              </div>
            </div>
          )}
          {user.presentationCount !== undefined && (
            <div className="relative group flex flex-col items-center">
              <PresentationIcon className="w-5 h-5 mb-1" />
              <span className="text-xs font-semibold text-slate-500">
                {user.presentationCount}
              </span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#dfdfe4] text-black text-[11px] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                Public Speaking
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#dfdfe4]" />
              </div>
            </div>
          )}
          {user.smileCount !== undefined && (
            <div className="relative group flex flex-col items-center">
              <SmileIcon className="w-5 h-5 mb-1" />
              <span className="text-xs font-semibold text-slate-500">
                {user.smileCount}
              </span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#dfdfe4] text-black text-[11px] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                University Partnership
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#dfdfe4]" />
              </div>
            </div>
          )}
        </div>

        {/* Total Score - hidden on mobile */}
        <div className="hidden md:flex flex-col items-end mr-6 border-l border-slate-200 pl-6">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider mb-0.5">
            TOTAL
          </span>
          <div className="flex items-center gap-1.5">
            <StarBlue className="w-6 h-6 text-sky-500" />
            <span className="font-bold text-2xl text-sky-500 leading-none">
              {user.score}
            </span>
          </div>
        </div>

        {/* Expand Toggle - desktop */}
        <div className="hidden md:block bg-slate-50 p-2 rounded-full text-sky-500 mr-2">
          {expanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* Mobile bottom row: divider + icons + expand */}
      <div
        className="flex md:hidden items-center justify-between px-4 pb-3 -mt-1 cursor-pointer"
        onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-4 text-sky-500">
          {user.educationCount !== undefined && (
            <div className="flex flex-col items-center">
              <EducationIcon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-semibold text-slate-500">{user.educationCount}</span>
            </div>
          )}
          {user.presentationCount !== undefined && (
            <div className="flex flex-col items-center">
              <PresentationIcon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-semibold text-slate-500">{user.presentationCount}</span>
            </div>
          )}
          {user.smileCount !== undefined && (
            <div className="flex flex-col items-center">
              <SmileIcon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-semibold text-slate-500">{user.smileCount}</span>
            </div>
          )}
        </div>
        <div className="bg-slate-50 p-2 rounded-full text-sky-500">
          {expanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}>
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 bg-slate-50/50 p-4 md:p-6">
            <h4 className="text-xs font-bold text-slate-500 mb-4 tracking-wider">
              RECENT ACTIVITY
            </h4>

            {/* Scrollable table wrapper for mobile */}
            <div className="w-full overflow-x-auto md:overflow-x-visible -mx-1 px-1">
              <div className="min-w-[500px] md:min-w-0 text-sm">
                <div className="grid grid-cols-12 gap-4 pb-2 border-b border-slate-200 text-slate-400 font-semibold text-xs tracking-wider">
                  <div className="col-span-6">ACTIVITY</div>
                  <div className="col-span-3 text-center">CATEGORY</div>
                  <div className="col-span-2 text-center">DATE</div>
                  <div className="col-span-1 text-right">POINTS</div>
                </div>

                <div className="mt-2 space-y-1">
                  {user.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="grid grid-cols-12 gap-4 py-3 items-center hover:bg-white rounded-lg transition-colors px-2 -mx-2">
                      <div className="col-span-6 font-medium text-slate-700 pr-4 truncate">
                        {activity.name}
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap">
                          {activity.category}
                        </span>
                      </div>
                      <div className="col-span-2 text-center text-slate-500">
                        {activity.date}
                      </div>
                      <div className="col-span-1 text-right font-bold text-sky-500">
                        +{activity.points}
                      </div>
                    </div>
                  ))}
                  {user.activities.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      No recent activity
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LeaderboardListProps {
  users: ListUser[];
}

export const LeaderboardList = ({ users }: LeaderboardListProps) => {
  return (
    <div className="w-full">
      {users.length > 0 ? (
        users.map((user) => <LeaderboardRow key={user.id} user={user} />)
      ) : (
        <div className="text-center py-10 text-slate-400 font-medium">
          No employees found matching your filters
        </div>
      )}
    </div>
  );
};
