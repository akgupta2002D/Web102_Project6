// src/components/SearchBar.jsx
function SearchBar({ query, setQuery }) {
    return (
      <input
        type="text"
        placeholder="Search for books..."
        className="search-bar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    );
  }
  
  export default SearchBar;
  