import PropTypes from 'prop-types';

const CharacterDetail = ({ character }) => {
    return (
        <div style={styles.container}>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name} style={styles.image} />
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Origin:</strong> {character.origin.name}</p>
            <p><strong>Last known location:</strong> {character.location.name}</p>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        margin: '10px',
        width: '300px'
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px'
    }
};

CharacterDetail.propTypes = {
    character: PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        status: PropTypes.string,
        species: PropTypes.string,
        gender: PropTypes.string,
        origin: PropTypes.object,
        location: PropTypes.object
    }).isRequired
};

export default CharacterDetail;
