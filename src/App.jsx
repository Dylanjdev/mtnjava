import logo from './assets/logo.png'
import coffeeBeans from './assets/CoffeeBeans.png'
import menuBackground from './assets/menubackground.webp'
import coffeeBeanVideo from './assets/coffebeanvid.mp4'
import './App.css'

function App() {
  return (
    <div className="site">
      <header className="hero" id="home">
        <nav className="topbar">
          <div className="brand">
            <img src={logo} alt="Mountain Java Coffee Co. logo" className="brand-logo" />
            <span className="brand-name">MOUNTAIN JAVA COFFEE CO.</span>
          </div>
          <div className="nav-links">
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href="#visit">Visit</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Freshly Roasted • Locally Loved</p>
          <h1>Your Neighborhood Coffee Escape</h1>
          <p className="hero-text">
            Handcrafted espresso, small-batch brews, and warm mountain-town vibes.
            Start your day at Mountain Java Coffee Co.
          </p>
          <a className="cta" href="#visit">
            Plan Your Visit
          </a>
        </div>

        <img
          src={coffeeBeans}
          alt="Coffee beans spilling decoration"
          className="hero-beans"
          aria-hidden="true"
        />
      </header>

      <main>
        <section className="section" id="menu">
          <div className="menu-shell">
            <aside className="menu-intro">
              <p className="menu-kicker">Crafted Daily</p>
              <h2>Our Menu</h2>
              <p>
                From bold hot espresso to smooth iced favorites, each drink is made to order
                with quality beans and mountain-town care.
              </p>
              <p className="menu-special">Wednesday Special: $5 any large drink</p>
            </aside>

            <div className="menu-layout">
              <article className="menu-block">
                <div className="menu-bg" style={{ backgroundImage: `url(${menuBackground})` }} aria-hidden="true" />
                <h3>Hot Coffee</h3>
                <div className="menu-sizes">
                  <span className="menu-size-label">Size</span>
                  <span>12OZ</span>
                  <span>16OZ</span>
                  <span>20OZ</span>
                </div>
                <ul className="menu-list">
                  <li><span>Coffee</span><span>$2.95</span><span>$3.25</span><span>$3.55</span></li>
                  <li><span>Latte</span><span>$4.55</span><span>$4.85</span><span>$5.15</span></li>
                  <li><span>Flavored Latte</span><span>$4.85</span><span>$5.15</span><span>$5.45</span></li>
                  <li><span>Chai Latte</span><span>$4.55</span><span>$4.85</span><span>$5.15</span></li>
                  <li><span>Dirty Chai</span><span>$4.85</span><span>$5.15</span><span>$5.45</span></li>
                  <li><span>Cappuccino</span><span>$4.55</span><span>$4.85</span><span>$5.15</span></li>
                  <li><span>Flavored Cappuccino</span><span>$4.85</span><span>$5.15</span><span>$5.45</span></li>
                  <li><span>Macchiato</span><span>$4.55</span><span>$4.85</span><span>$5.15</span></li>
                  <li><span>Flavored Macchiato</span><span>$4.85</span><span>$5.15</span><span>$5.45</span></li>
                </ul>
              </article>

              <article className="menu-block">
                <div className="menu-bg" style={{ backgroundImage: `url(${menuBackground})` }} aria-hidden="true" />
                <h3>Iced Coffee</h3>
                <div className="menu-sizes">
                  <span className="menu-size-label">Size</span>
                  <span>16OZ</span>
                  <span>20OZ</span>
                  <span>24OZ</span>
                </div>
                <ul className="menu-list">
                  <li><span>Iced Coffee</span><span>$3.25</span><span>$3.55</span><span>$3.85</span></li>
                  <li><span>Flavored Iced Coffee</span><span>$3.55</span><span>$3.85</span><span>$4.15</span></li>
                  <li><span>Iced Latte</span><span>$5.25</span><span>$5.55</span><span>$5.85</span></li>
                  <li><span>Flavored Iced Latte</span><span>$5.55</span><span>$5.85</span><span>$6.15</span></li>
                  <li><span>Iced Cappuccino</span><span>$5.25</span><span>$5.55</span><span>$5.85</span></li>
                  <li><span>Flavored Iced Cappuccino</span><span>$5.55</span><span>$5.85</span><span>$6.15</span></li>
                  <li><span>Macchiato</span><span>$5.25</span><span>$5.55</span><span>$5.85</span></li>
                  <li><span>Flavored Macchiato</span><span>$5.55</span><span>$5.85</span><span>$6.15</span></li>
                </ul>
              </article>

              <article className="menu-block">
                <div className="menu-bg" style={{ backgroundImage: `url(${menuBackground})` }} aria-hidden="true" />
                <h3>Non Coffee</h3>
                <div className="menu-sizes">
                  <span className="menu-size-label">Size</span>
                  <span>16OZ</span>
                  <span>20OZ</span>
                  <span>24OZ</span>
                </div>
                <ul className="menu-list">
                  <li><span>Hot Tea</span><span>$3.25</span><span>$3.55</span><span>$3.85</span></li>
                  <li><span>Hot Chocolate</span><span>$3.55</span><span>$3.85</span><span>$4.15</span></li>
                  <li><span>Matcha</span><span>$4.85</span><span>$5.15</span><span>$5.45</span></li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-top">
            <div className="about-copy">
              <p className="menu-kicker">Our Story</p>
              <h2>Built for Coffee Lovers</h2>
              <p>
                Mountain Java Coffee Co. is a cozy stop for morning commuters, weekend adventurers,
                and everyone in between. We focus on quality beans, friendly service,
                and a space that feels like home.
              </p>
            </div>
            <div className="panel features-panel">
              <h3>What You’ll Find</h3>
              <div className="feature-grid">
                <p>Fresh pastries every morning</p>
                <p>Seasonal drink specials</p>
                <p>Comfortable lounge seating + free Wi-Fi</p>
                <p>Grab-and-go options for busy mornings</p>
              </div>
            </div>
          </div>

          <div className="reviews-panel">
            <h3>Guest Reviews</h3>
            <div className="reviews-grid">
              <article className="review-card">
                <p className="review-quote">
                  “Great drinks and service! Always happy to support a local small business owner. Thanks Alexa :)”
                </p>
                <p className="review-name">Stacie Welch</p>
                <p className="review-meta">7 reviews · 1 photo · 3 months ago</p>
              </article>

              <article className="review-card">
                <p className="review-quote">“Never disappointed! Such a great shop.”</p>
                <p className="review-name">Danielle</p>
                <p className="review-meta">Local Guide · 6 reviews · 4 months ago</p>
                <p className="review-rating">Food: 5/5 · Service: 5/5 · Atmosphere: 5/5</p>
              </article>

              <article className="review-card">
                <p className="review-quote">
                  “Great little coffee shop. Stop in and see them. Coffee was great.”
                </p>
                <p className="review-name">Emma Starnes</p>
                <p className="review-meta">4 reviews · 11 months ago · Take out · $1–10</p>
                <p className="review-rating">Service: 5/5 · Atmosphere: 5/5</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section contact-video" id="visit">
          <video className="contact-video-bg" autoPlay muted loop playsInline>
            <source src={coffeeBeanVideo} type="video/mp4" />
          </video>
          <div className="contact-overlay" />

          <div className="contact-content">
            <h2>Visit Mountain Java Coffee Co.</h2>
            <div className="grid visit-grid">
              <article className="info-box">
                <h3>Location</h3>
                <p>334 Duff Patt Highway, Ste 102</p>
                <p>24244</p>
              </article>
              <article className="info-box">
                <h3>Hours</h3>
                <p>Mon–Fri: 6:30 AM – 6:00 PM</p>
                <p>Sat–Sun: 7:00 AM – 5:00 PM</p>
              </article>
              <article className="info-box">
                <h3>Contact Info</h3>
                <p>
                  <a href="tel:+14233002993">+1 423-300-2993</a>
                </p>
                <p>
                  <a href="mailto:mountainjava24@gmail.com">mountainjava24@gmail.com</a>
                </p>
                <p>Follow us on Facebook for specials and events.</p>
                <a
                  href="https://www.facebook.com/profile.php?id=61559421226206"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Facebook Page
                </a>
              </article>
            </div>

            <iframe
              className="contact-map"
              title="Mountain Java Coffee Co. map"
              src="https://www.google.com/maps?q=334+Duff+Patt+Highway+Ste+102+24244&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src={logo} alt="Mountain Java Coffee Co. emblem" className="footer-logo" />
        <p>© {new Date().getFullYear()} MOUNTAIN JAVA COFFEE CO.</p>
        <p>
          Built by{' '}
          <a href="https://smithdigitals.com/" target="_blank" rel="noreferrer">
            Smith Digitals
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
