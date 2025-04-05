// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Card from "./Card";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("test"); // default query
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // Options for filtering by publish year
  const filterOptions = ["All", "Before 1950", "1950-2000", "After 2000"];

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
      const headers = new Headers({
        "User-Agent": "OpenLibraryDashboard/1.0 (akgupta2002d@gmail.com)"
      });
      const response = await fetch(url, { headers });
      const data = await response.json();
      // data.docs contains the array of book results
      setBooks(data.docs || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Fetch books when the query changes.
  useEffect(() => {
    fetchBooks();
  }, [query]);

  // Apply filter based on the first publish year.
  const filteredBooks = books.filter((book) => {
    if (filter === "All") return true;
    const year = book.first_publish_year;
    if (!year) return false; // Exclude if no year is provided
    if (filter === "Before 1950") return year < 1950;
    if (filter === "1950-2000") return year >= 1950 && year <= 2000;
    if (filter === "After 2000") return year > 2000;
    return true;
  });

  // Summary statistics calculations
  const totalBooks = filteredBooks.length;
  const publishYears = filteredBooks
    .map((book) => book.first_publish_year)
    .filter(Boolean);
  const earliestYear = publishYears.length ? Math.min(...publishYears) : "N/A";
  const latestYear = publishYears.length ? Math.max(...publishYears) : "N/A";

  return (
    <div className="dashboard">
      <div>
        <SearchBar query={query} setQuery={setQuery} />
        <Filter filter={filter} setFilter={setFilter} options={filterOptions} />
      </div>

      <div className="summary">
        <h3>Summary Statistics</h3>
        <p>Total Books: {totalBooks}</p>
        <p>Earliest Publish Year: {earliestYear}</p>
        <p>Latest Publish Year: {latestYear}</p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {filteredBooks.map((book, idx) => (
            <Card key={idx} item={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
