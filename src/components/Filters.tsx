import { useState, useRef, useEffect } from "react";

const ChevronDown = () => (
  <svg
    className="w-4 h-4 text-black absolute right-3 pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const SearchIcon = () => (
  <svg
    className="w-4 h-4 text-black"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  widthClass: string;
}

const CustomSelect = ({
  options,
  value,
  onChange,
  widthClass,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${widthClass}`} ref={containerRef}>
      <div
        className={`flex items-center h-9 bg-[#ebebed] border border-black rounded-[2px] cursor-pointer px-3`}
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex-1 text-sm text-black truncate select-none pr-6">
          {value}
        </div>
        <ChevronDown />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#ebebed] rounded-b-[2px] shadow-sm z-50">
          {options.map((opt) => (
            <div
              key={opt}
              className="px-3 py-2 text-sm text-black cursor-pointer select-none hover:bg-white"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface FiltersProps {
  category: string;
  setCategory: (val: string) => void;
  year: string;
  setYear: (val: string) => void;
  quarter: string;
  setQuarter: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
}

export const Filters = ({
  category,
  setCategory,
  year,
  setYear,
  quarter,
  setQuarter,
  search,
  setSearch,
}: FiltersProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const XIcon = () => (
    <svg
      className="w-4 h-4 cursor-pointer text-slate-400 hover:text-black"
      onClick={() => setSearch("")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <div className="w-full border border-gray-300 shadow-sm rounded-md p-4 flex flex-col md:flex-row gap-3 z-20 relative">
      {/* Year */}
      <CustomSelect
        options={["All Years", "2025"]}
        value={year}
        onChange={setYear}
        widthClass="w-full md:w-[120px]"
      />

      {/* Quarter */}
      <CustomSelect
        options={["All Quarters", "Q1", "Q2", "Q3", "Q4"]}
        value={quarter}
        onChange={setQuarter}
        widthClass="w-full md:w-[140px]"
      />

      {/* Category */}
      <CustomSelect
        options={[
          "All Categories",
          "Education",
          "Public Speaking",
          "University Partnership",
        ]}
        value={category}
        onChange={setCategory}
        widthClass="w-full md:w-[180px]"
      />

      {/* Search */}
      <div className="relative w-full md:flex-1 flex items-center h-11 md:h-9 bg-[#ebebed] border border-black text-black rounded-[2px] overflow-hidden transition-colors">
        <div
          className={`absolute left-3 transition-all duration-300 ease-in-out text-slate-400 ${
            isSearchFocused || search
              ? "-translate-x-8 opacity-0"
              : "translate-x-0 opacity-100"
          }`}>
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full h-full bg-transparent border-none outline-none shadow-none m-0 pb-[0.5px] text-sm text-black transition-all duration-300 ease-in-out pr-8 ${
            isSearchFocused || search ? "pl-3" : "pl-9 font-normal"
          }`}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        {search && (
          <div
            className="absolute right-3 cursor-pointer hover:text-black transition-colors"
            onMouseDown={(e) => {
              e.preventDefault();
              setSearch("");
            }}>
            <XIcon />
          </div>
        )}
      </div>
    </div>
  );
};
