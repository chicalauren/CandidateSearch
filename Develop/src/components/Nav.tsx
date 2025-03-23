// imports
import { Link } from 'react-router-dom';

const Nav = () => {
  // Necessary code to display the navigation bar and link between the pages
  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">              
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/">Home</Link> {/* Link to the Home page */}
        </li>
        <li className="nav-item">
          <Link to="/SavedCandidates">Saved Candidates</Link> {/* Link to Saved Candidates */}
        </li>
      </ul>
      </div>
      </div>
      </nav>
    )
};

export default Nav;
