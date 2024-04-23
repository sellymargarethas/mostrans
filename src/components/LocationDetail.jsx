import PropTypes from 'prop-types';
import CharacterCard from './CharacterCard'; // Assuming you have this component

const LocationDetail = ({ location, characters }) => {
    return (
        <div style={styles.container}>
            <h2>{location.name}</h2>
            <div>
                {characters.map(character => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        margin: '10px',
        width: '100%'
    }
};

LocationDetail.propTypes = {
    location: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    characters: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LocationDetail;
