import { useState, useEffect } from "react";
import "./App.css";

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

      {/* Hero / Banner */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tagline">Carleton & St. Olaf</p>
          <h1 className="hero-title">Carls Party Site</h1>
          <p className="hero-subtitle">Your guide to the best parties on the hill. Find events, explore venues, and never miss a night out.</p>
          <a href="#parties" className="hero-btn">Browse Parties</a>
        </div>
      </section>

      {/* Party Cards */}
      <section className="content" id="parties">
        <h2 className="section-title">Upcoming Parties</h2>
        <p className="section-sub">{parties.length} events found</p>
        <div className="party-list">
          {parties.map((party) => (
            <div key={party.id} className="party-card">
              <div className="card-school-tag">{party.school}</div>
              <h4 className="card-house">{party.house}</h4>
              <p className="card-address">📍 {party.address}</p>
              <p className="card-date">🗓 {party.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
