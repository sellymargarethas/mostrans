import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CharactersByLocationPage = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // Fetch locations data
        fetch('https://rickandmortyapi.com/api/location')
            .then(response => response.json())
            .then(data => setLocations(data.results))
            .catch(error => console.error('Error fetching locations:', error));
    }, []);

    // Function to fetch characters by IDs
    const fetchCharactersByIDs = async (characterIDs) => {
        const requests = characterIDs.map(id =>
            fetch(`https://rickandmortyapi.com/api/character/${id}`).then(res => res.json())
        );
        return Promise.all(requests);
    };

    useEffect(() => {
        if (selectedLocation) {
            fetchCharactersByIDs(selectedLocation.residents.map(resident => {
                const urlParts = resident.split('/');
                return urlParts[urlParts.length - 1];
            }))
            .then(setCharacters)
            .catch(error => console.error('Error fetching characters:', error));
        }
    }, [selectedLocation]);

    const handleLocationSelect = (event) => {
        const locationId = parseInt(event.target.value);
        const location = locations.find(loc => loc.id === locationId);
        setSelectedLocation(location);
        setCharacters([]); // Clear characters while loading new ones
    };

    return (
        <div>
            <div style={styles.locationsContainer}>
                <h2>Select Location:</h2>
                <select onChange={handleLocationSelect} defaultValue="" style={styles.dropdown}>
                    <option value="" disabled>Select a location</option>
                    {locations.map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                </select>
            </div>
            {selectedLocation && (
                <div>
                    <h3>Characters in {selectedLocation.name}</h3>
                    {characters.length === 0 ? (
                        <p>There are no characters</p>
                    ) : (
                        <div style={styles.charactersContainer}>
                            {characters.map(character => (
                                <div key={character.id} style={styles.characterCard}>
                                    <img src={character.image} alt={character.name} style={styles.image} />
                                    <p>{character.name}</p>
                                    <Link to={`/character/${character.id}`} style={styles.detailsLink}>View Details</Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Styles for the component
const styles = {
    locationsContainer: {
        textAlign: 'center', // Center the contents horizontally
    },
    dropdown: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        color: '#333',
        height: '40px', // Adjust height of dropdown
        width: 'fit-content', // Adjust width to fit content
        margin: 'auto', // Center the dropdown
    },
    charactersContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    characterCard: {
        width: '200px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        margin: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        borderRadius: '8px',
    },
    detailsLink: {
        marginTop: '10px',
        textDecoration: 'none',
        color: '#007bff',
    }
};

export default CharactersByLocationPage;
