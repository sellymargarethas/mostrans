import PropTypes from 'prop-types';

const LocationList = ({ locations, onLocationSelect }) => {
    return (
        <div style={styles.list}>
            {locations.map(location => (
                <button key={location.id} onClick={() => onLocationSelect(location)} style={styles.button}>
                    {location.name}
                </button>
            ))}
        </div>
    );
};

const styles = {
    list: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        padding: '10px 20px',
        margin: '5px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#ccc'
    }
};

LocationList.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })).isRequired,
    onLocationSelect: PropTypes.func.isRequired
};

export default LocationList;
