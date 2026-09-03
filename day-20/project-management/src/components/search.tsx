import "../styles/search.css";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (text: string) => void;
}

function SearchFilter({ searchTerm, setSearchTerm }: SearchFilterProps) {
  return (
    <div className="search-filter-container">
      <input
        type="search"
        placeholder="Search"
        className="search-filter-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchFilter;
