import { useState, useEffect } from "react";




function App() {
  const [parties, setParties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // this allows data to load without the page reloading
  const handleSearch = async (e) => {
    e.preventDefault(); // Stops the page from refreshing...so we have one continuous page
    
    // pass in search query
    const response = await fetch(`http://127.0.0.1:5000/api/parties/search?q=${searchQuery}`);
    const data = await response.json();
    
    setParties(data); // display results
  };
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/parties")
    .then((res) => res.json())
    .then((data) => setParties(data));
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <section className="navigation-bar">
        <nav>
          <ul>
            <li className="active">
              <a href="/">🏠 Home</a>
            </li>
            <li>
              <form onSubmit={handleSearch} className="search-form">
                {
                  <input
                    type="text"
                    placeholder="🔎 Search Event..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                }
                <button type="submit" className="search-btn">
                  Search
                </button>
              </form>
            </li>
            <li>
              <a href="/state">Contact Us </a>
            </li>
          </ul>
        </nav>
      </section>

      {/* Secondary Nav / Title */}
      <nav>
        <h1>Carls Party Site</h1>
      </nav>

      {/* Hero / Banner */}
      <section className="hero">
        <h2>Welcome</h2>
        <p>This is my one-page website.</p>
        <button>Get Started</button>
      </section>

      {/* Additional Content Section (placeholder to keep structure expandable) */}
      <section className="content">
        <h3>Upcoming Parties</h3>
        <div className="party-list">
          {parties.map((party) => (
            <div key={party.id} className="party-card">
              <h4>{party.house}</h4>
              <p>{party.school} | {party.address}</p>
              <p>Date: {party.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
