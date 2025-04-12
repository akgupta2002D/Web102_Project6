// src/components/Search.jsx
import { useState } from "react";

function Search() {
  const [term, setTerm] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    setMessage(`Search functionality coming soon. You searched for: "${term}"`);
  };

  return (
    <div className="dashboard">
      <h2>Search Page</h2>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Type book title or author..."
        style={{ padding: "10px", width: "80%", marginRight: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px 20px" }}>Search</button>
      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default Search;