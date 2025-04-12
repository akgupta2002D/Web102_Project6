// src/components/DetailView.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);
      } catch (e) {
        console.error("Detail fetch error", e);
      }
    };
    fetchDetail();
  }, [id]);

  if (!book) return <p>Loading book details...</p>;

  const coverId = book.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/256x390?text=No+Cover";

  return (
    <div className="dashboard">
      <button onClick={() => navigate(-1)} style={{ marginBottom: '10px' }}>← Back</button>
      <h2>{book.title}</h2>
      {book.description && <p>{book.description.value || book.description}</p>}
      {book.subjects && <p><strong>Subjects:</strong> {book.subjects.join(", ")}</p>}
      <img src={coverUrl} alt={book.title} style={{ maxWidth: '200px', marginBottom: '20px' }} />

    </div>
  );
}

export default DetailView;