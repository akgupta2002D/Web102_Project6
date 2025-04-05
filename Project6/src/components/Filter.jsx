// src/components/Filter.jsx
function Filter({ filter, setFilter, options }) {
    return (
      <select
        className="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  
  export default Filter;
  