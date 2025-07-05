import { useState } from "react";
import "./SearchBar.scss";

interface SearchInputProps {
  searchInput?: string;
  handleSearchClick: (searchInput: string) => void;
}

export const SearchBar: React.FC<SearchInputProps> = ({
  searchInput,
  handleSearchClick,
}) => {
  const [search, setSearch] = useState<string>(searchInput || "");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <button
        onClick={() => handleSearchClick(search)}
        className="search-button"
      >
        Search
      </button>
    </div>
  );
};
