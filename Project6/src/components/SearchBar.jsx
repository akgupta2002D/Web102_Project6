// src/components/SearchBar.jsx
function SearchBar({ query, setQuery }) {
    return (
      <input
        style={{ padding: "10px", width: "80%", marginRight: "10px" }}
        type="text"
        placeholder="Search for books..."
        className="search-bar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    );
  }
  
  export default SearchBar;
  