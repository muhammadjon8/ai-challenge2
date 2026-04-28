import { useState, useMemo } from "react";

const noProfileUrl =
  "https://ventionteamsinc.sharepoint.com/sites/edu/_layouts/15/userphoto.aspx?size=L&accountname=veranika.rybachonak%40ventionteams.com";

type LeaderboardUser = {
  id: string;
  name: string;
  title: string;
  score: number;
  avatarUrl?: string;
  place: 1 | 2 | 3;
};

import { mockLeaderboardData } from "../data/mockLeaderboardData";

const StarIcon = ({ className }: { className?: string }) => (
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

const LeaderboardPlace = ({ user }: { user: LeaderboardUser }) => {
  const isFirst = user.place === 1;
  const isSecond = user.place === 2;

  return (
    <div
      className={`flex flex-col items-center ${isFirst ? "md:-mt-12 md:z-10 order-first md:order-0" : isSecond ? "order-2 md:order-0 md:mt-12" : "order-3 md:order-0 md:mt-12"}`}
      style={{ width: "100%", maxWidth: isFirst ? "280px" : "240px" }}>
      {/* Avatar Section */}
      <div className="relative mb-3 flex flex-col items-center">
        <div
          className={`rounded-full p-[3px] shadow-sm ${
            isFirst ? "bg-[#eab308]" : "bg-white"
          }`}>
          <img
            src={user.avatarUrl || noProfileUrl}
            alt={user.name}
            className={`object-cover rounded-full ${
              isFirst ? "w-[104px] h-[104px]" : "w-[84px] h-[84px]"
            }`}
          />
        </div>

        {/* Place Badge */}
        <div
          className={`absolute flex items-center justify-center text-white font-bold rounded-full border-2 border-white ${
            isFirst
              ? "-bottom-2 right-0 w-8 h-8 bg-[#eab308] text-base"
              : isSecond
                ? "-bottom-1 -right-1 w-7 h-7 bg-[#94a3b8] text-sm"
                : "-bottom-1 -right-1 w-7 h-7 bg-[#b45309] text-sm"
          }`}>
          {user.place}
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-3 px-2">
        <h3 className={`font-bold text-[#0f172a] text-2xl`}>{user.name}</h3>
        <p
          className={`text-[#64748b] leading-tight mt-0.5 max-w-[180px] mx-auto font-normal`}>
          {user.title}
        </p>
      </div>

      {/* Score */}
      <div
        className={`flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full mb-4 shadow-sm border ${
          isFirst
            ? "bg-[#fef3c7] border-[#fde047] text-[#d97706]"
            : "bg-white border-[#e2e8f0] text-[#0ea5e9]"
        }`}>
        <StarIcon
          className={`w-4 h-4 ${isFirst ? "text-[#d97706]" : "text-[#0ea5e9]"}`}
        />
        <span className="font-bold text-sm">{user.score}</span>
      </div>

      {/* Podium */}
      <div
        className={`w-full flex justify-center relative overflow-hidden ${isFirst ? "" : "pt-4"}`}
        style={{
          height: isFirst ? "180px" : isSecond ? "120px" : "100px",
          borderRadius: "8px 8px 0 0",
          background: isFirst
            ? "linear-gradient(180deg, #fef3c7, #fde68a)"
            : "linear-gradient(180deg, #e2e8f0, #cbd5e1)",
          borderTop: isFirst ? "3px solid #fde047" : "3px solid #cbd5e1",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, .06)",
          alignItems: isFirst ? "center" : "flex-start",
        }}>
        <span
          className={`font-bold select-none ${isFirst ? "text-8xl md:text-[130px]" : "text-7xl md:text-[90px]"}`}
          style={{
            color: isFirst ? "#fde047" : "#c9d3df",
            opacity: 1,
            lineHeight: 1,
          }}>
          {user.place}
        </span>
      </div>
    </div>
  );
};

import { LeaderboardList } from "./LeaderboardList";
import { Filters } from "./Filters";
import { Comments } from "./Comments";
import { PostStats } from "./PostStats";

export const Leaderboard = () => {
  const [category, setCategory] = useState("All Categories");
  const [year, setYear] = useState("All Years");
  const [quarter, setQuarter] = useState("All Quarters");
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return mockLeaderboardData.filter((user) => {
      // Category filter
      if (category !== "All Categories") {
        const hasCategory = user.activities.some(
          (a) => a.category === category,
        );
        if (!hasCategory) return false;
      }
      // Year filter
      if (year !== "All Years") {
        const hasYear = user.activities.some((a) => a.date.endsWith(year));
        if (!hasYear) return false;
      }
      // Quarter filter
      if (quarter !== "All Quarters") {
        const hasQuarter = user.activities.some((a) => a.quarter === quarter);
        if (!hasQuarter) return false;
      }
      // Search filter
      if (search) {
        if (!user.name.toLowerCase().includes(search.toLowerCase()))
          return false;
      }
      return true;
    });
  }, [category, year, quarter, search]);

  const showPodium = useMemo(() => {
    if (!search) return true;

    // If searching, check if any of the top 3 (after category/year/quarter filters) match the search
    const top3WithFiltersOnly = mockLeaderboardData
      .filter((user) => {
        if (category !== "All Categories") {
          const hasCategory = user.activities.some(
            (a) => a.category === category,
          );
          if (!hasCategory) return false;
        }
        if (year !== "All Years") {
          const hasYear = user.activities.some((a) => a.date.endsWith(year));
          if (!hasYear) return false;
        }
        if (quarter !== "All Quarters") {
          const hasQuarter = user.activities.some((a) => a.quarter === quarter);
          if (!hasQuarter) return false;
        }
        return true;
      })
      .slice(0, 3);

    return top3WithFiltersOnly.some((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, category, year, quarter]);

  const podiumUsers: LeaderboardUser[] = useMemo(() => {
    if (!showPodium) return [];

    const top3 = filteredUsers.slice(0, 3);
    // Map to the format needed by Podium, ensuring correct [2, 1, 3] layout
    const layout = [
      top3[1] ? { ...top3[1], place: 2 as const } : null,
      top3[0] ? { ...top3[0], place: 1 as const } : null,
      top3[2] ? { ...top3[2], place: 3 as const } : null,
    ].filter(Boolean) as (any & { place: 1 | 2 | 3 })[];

    return layout.map((user) => ({
      id: user.id,
      name: user.name,
      title: user.title,
      score: user.score,
      avatarUrl: user.avatarUrl,
      place: user.place,
    }));
  }, [filteredUsers, showPodium]);

  return (
    <div className="w-full bg-[#f3f2f1] min-h-screen flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-[1200px] flex flex-col">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-[32px] font-bold tracking-tight text-black">
            Company Leader Board 2025
          </h1>
        </div>

        {/* Header section */}
        <div className="w-full bg-[#f8fafc] rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-[28px] font-bold text-[#0f172a] mb-1.5 tracking-tight leading-none">
              Leaderboard
            </h2>
            <p className="text-[13px] md:text-sm text-[#64748b]">
              Top performers based on contributions and activity
            </p>
          </div>

          {/* Filters */}
          <Filters
            category={category}
            setCategory={setCategory}
            year={year}
            setYear={setYear}
            quarter={quarter}
            setQuarter={setQuarter}
            search={search}
            setSearch={setSearch}
          />

          {/* Podium */}
          {showPodium && (
            <div className="w-full flex flex-col items-center gap-8 md:flex-row md:items-end md:justify-center md:gap-6 mt-10 mb-12 md:mt-16 md:mb-20">
              {podiumUsers.map((user) => (
                <LeaderboardPlace key={user.id} user={user} />
              ))}
            </div>
          )}

          <LeaderboardList users={filteredUsers} />
        </div>

        {/* Comments Section */}
        <Comments />

        {/* Post Stats */}
        <PostStats />
      </div>
    </div>
  );
};

export default Leaderboard;
