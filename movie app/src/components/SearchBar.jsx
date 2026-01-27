import { useState } from "react";


function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    function handleSubmit(e){
      e.preventDefault();

      if (!query.trim()){ {
        return;
      } 
      onSearch(query.trim());
    }

  return(
  <div className= "search-container">
    <input 
    type = "text"
    placeholder="Search for movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter'){
        handleSubmit(e)
      }
    }}
    />
    <button onClick={handleSubmit}>Search</button>
  </div>
  ) 
}
}

export default SearchBar;