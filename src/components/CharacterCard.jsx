import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
    return (
        <div style={styles.card}>
            <img src={character.image} alt={character.name} style={styles.image} />
            <div style={styles.info}>
                <h2 style={styles.name}>{character.name}</h2>
                <p style={styles.status}>Status: {character.status}</p>
                <Link to={`/character/${character.id}`} style={styles.detailsLink}>View Details</Link>
            </div>
        </div>
    );
};

// Inline styles for the component
const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        margin: '10px',
        padding: '10px',
        width: '200px',
    },
    image: {
        width: '100%',
        borderRadius: '8px',
    },
    info: {
        textAlign: 'center',
    },
    name: {
        fontSize: '16px',
        color: '#333',
        margin: '10px 0 5px 0',
    },
    status: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '10px',
    },
    detailsLink: {
        fontSize: '14px',
        color: '#70ba94',
        textDecoration: 'none',
    }
};

CharacterCard.propTypes = {
    character: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired
};

export default CharacterCard;
