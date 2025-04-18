import { Link } from "react-router-dom";

function Card({ item }) {
  const coverUrl = item.cover_i
    ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
    : "https://via.placeholder.com/128x195?text=No+Cover";

  return (
    <Link to={`/detail/${item.key?.split("/").pop()}`} className="card">
      <img src={coverUrl} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        {item.author_name && <p>by {item.author_name.join(", ")}</p>}
        {item.first_publish_year && (
          <p>First published in {item.first_publish_year}</p>
        )}
      </div>
    </Link>
  );
}

export default Card;