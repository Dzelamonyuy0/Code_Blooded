import './App.css';

function App() {
  return (
    <div className="App">

      {/* Navigation */}
      <section className="navigation-bar">
        <nav>
          <ul>
            <li className="active"><a href="/">🏠 Home</a></li>
            <li>
              <form onSubmit={handleSearch} className="search-form">
                {<input
                  type="text"
                  placeholder="🔎 Search Event..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                /> }
                <button type="submit" className="search-btn">Search</button>
              </form>
            </li>
            <li><a href="/state">Contact Us </a></li>
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
        <h3>More Content Coming Soon</h3>
        <p>You can add more sections here as your site grows.</p>
      </section>

    </div>
  );
}

export default App;