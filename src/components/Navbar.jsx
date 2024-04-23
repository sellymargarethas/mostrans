import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <NavLink to="/" exact style={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>
            Characters List
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/locations" style={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>
            Characters By Location
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

// Inline styles for the NavBar
const styles = {
  nav: {
    backgroundColor: '#108c4c',
    padding: '10px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  activeNavLink: {
    color: 'white',
    textDecoration: 'underline',
  }
};

export default NavBar;