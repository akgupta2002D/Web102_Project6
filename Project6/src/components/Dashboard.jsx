// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Card from "./Card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar
} from 'recharts';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("test");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

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
      setBooks(data.docs || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [query]);

  const filteredBooks = books.filter((book) => {
    if (filter === "All") return true;
    const year = book.first_publish_year;
    if (!year) return false;
    if (filter === "Before 1950") return year < 1950;
    if (filter === "1950-2000") return year >= 1950 && year <= 2000;
    if (filter === "After 2000") return year > 2000;
    return true;
  });

  const chartData = filteredBooks.reduce((acc, book) => {
    const year = book.first_publish_year;
    if (year) {
      acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {});

  const authorData = filteredBooks.reduce((acc, book) => {
    const author = book.author_name?.[0];
    if (author) {
      acc[author] = (acc[author] || 0) + 1;
    }
    return acc;
  }, {});

  const formattedChartData = Object.entries(chartData).map(([year, count]) => ({ year, count }));
  const formattedAuthorData = Object.entries(authorData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([author, count]) => ({ author, count }));

  return (
    <div className="dashboard">
      <div>
        <SearchBar query={query} setQuery={setQuery} />
        <Filter filter={filter} setFilter={setFilter} options={filterOptions} />
      </div>

      <div className="summary">
        <h3>Summary Statistics</h3>
        <p>Total Books: {filteredBooks.length}</p>
        <p>Earliest Publish Year: {Math.min(...filteredBooks.map(b => b.first_publish_year || Infinity)) || "N/A"}</p>
        <p>Latest Publish Year: {Math.max(...filteredBooks.map(b => b.first_publish_year || 0)) || "N/A"}</p>
      </div>

      <div>
        <h3>Books Published Over Time</h3>
        <LineChart width={600} height={300} data={formattedChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </div>

      <div>
        <h3>Top 10 Authors by Book Count</h3>
        <BarChart width={600} height={300} data={formattedAuthorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="author" interval={0} angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="card-container">
          {filteredBooks.map((book, idx) => (
            <Card key={idx} item={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;