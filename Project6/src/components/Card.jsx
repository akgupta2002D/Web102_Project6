// src/components/Card.jsx
function Card({ item }) {
    // If a cover image is available, use it; otherwise, use a placeholder.
    const coverUrl = item.cover_i
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
      : "https://via.placeholder.com/128x195?text=No+Cover";
  
    return (
      <div className="card">
        <img src={coverUrl} alt={item.title} />
        <div>
          <h2>{item.title}</h2>
          {item.author_name && <p>by {item.author_name.join(", ")}</p>}
          {item.first_publish_year && (
            <p>First published in {item.first_publish_year}</p>
          )}
        </div>
      </div>
    );
  }
  
  export default Card;
  