// This is home page
//Mix of all so has movies in one row, tv shows in one
//live tv in one row
//shows coloured blocks having english,telugu,hindi,tamil and so on
// once logged in it should display the user on the top right in homepage

import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <br></br>
        <br></br>
        <h1>Welcome to StreamZone</h1>
        <p>Explore the best Movies, TV Shows, and Live TV all in one place.</p>
      </header>
      <div className="home-sections">
        {/* Movies Section */}
        <div className="section">
          <h2>Movies</h2>
          <div className="section-grid">
            <Link to="/movies" className="section-card">
              <img
                src="https://m.media-amazon.com/images/I/71OHH9HaB5S.jpg"
                alt="Movies"
              />
            </Link>
            <Link to="/movies" className="section-card">
              <img
                src="https://rukminim2.flixcart.com/image/850/1000/jr3t5e80/poster/h/y/t/medium-black-panther-movie-poster-for-room-office-13-inch-x-19-original-imafcz4zqkfaxxcc.jpeg?q=90&crop=false"
                alt="Movies"
              />
            </Link>
            <Link to="/movies" className="section-card">
              <img
                src="https://img.freepik.com/premium-photo/movie-poster-design_841014-8784.jpg"
                alt="Movies"
              />
            </Link>
          </div>
          <Link to="/movies" className="view-more">
            View More
          </Link>
        </div>

        {/* Live TV Section */}
        <div className="section">
          <h2>Live TV</h2>
          <div className="section-grid">
            <Link to="/livetv" className="section-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1OQZAp3jMeY3gX4qF1-mE8B7GoPHHJ4YizQ&s"
                alt="Live TV"
              />
            </Link>
            <Link to="/livetv" className="section-card">
              <img
                src="https://data1.ibtimes.co.in/en/full/765037/bigg-boss-telugu-5.jpg?h=450&l=50&t=40"
                alt="Live TV"
              />
            </Link>
            <Link to="/livetv" className="section-card">
              <img
                src="https://m.media-amazon.com/images/I/81s6DUyQCZL._AC_SL1500_.jpg"
                alt="Live TV"
              />
            </Link>
          </div>
          <Link to="/livetv" className="view-more">
            View More
          </Link>
        </div>

        {/* TV Shows Section */}
        <div className="section">
          <h2>TV Shows</h2>
          <div className="section-grid">
            <Link to="/tvshows" className="section-card">
              <img
                src="https://www.tallengestore.com/cdn/shop/products/91TmR1v-qRL._RI_f7aa2caf-8e52-4bf4-9506-1595c8440c74.jpg?v=1570155292"
                alt="TV Shows"
              />
            </Link>
            <Link to="/tvshows" className="section-card">
              <img
                src="https://rukminim2.flixcart.com/image/850/1000/jdxeykw0/poster/6/j/k/medium-sherlock-holmes-poster-sherlock-holmes-tv-show-posters-original-imaf2qfyfubfrcke.jpeg?q=90&crop=false"
                alt="TV Shows"
              />
            </Link>
            <Link to="/tvshows" className="section-card">
              <img
                src="https://www.tallengestore.com/cdn/shop/products/MoneyHeist-NetflixTVShowPosterFanArt_f3ca06f4-0ea3-4795-818a-b680979e8073.jpg?v=1589268519https://m.media-amazon.com/images/I/71UV4KfD9fL._AC_SL1500_.jpg"
                alt="TV Shows"
              />
            </Link>
          </div>
          <Link to="/tvshows" className="view-more">
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
