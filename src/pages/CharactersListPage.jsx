import { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import { gql, useQuery } from '@apollo/client';
import debounce from 'lodash.debounce'; // Import debounce utility

export const FETCH_CHARACTERS = gql`
  query GetCharacters($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        id
        name
        status
        species
        type
        gender
        image
      }
    }
  }
`;

const CharactersListPage = () => {
    const [characters, setCharacters] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        status: '',
        species: '',
        type: '',
        gender: ''
    });
    const [typeOptions, setTypeOptions] = useState([]);
    const [genderOptions, setGenderOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const { error, data } = useQuery(FETCH_CHARACTERS, {
        variables: { filter: filters }
    });

    useEffect(() => {
        if (data && data.characters) {
            setCharacters(data.characters.results);
            setTypeOptions(getUniqueValues(data.characters.results, 'type'));
            setGenderOptions(getUniqueValues(data.characters.results, 'gender'));
            setStatusOptions(getUniqueValues(data.characters.results, 'status'));
            setSpeciesOptions(getUniqueValues(data.characters.results, 'species'));
        }
    }, [data]);

    useEffect(() => {
        // Debounced filter function
        const filterCharacters = debounce(() => {
            // Filter characters based on current filters
            const newFilteredData = characters.filter(character => {
                const nameMatch = character.name.toLowerCase().includes(filters.name.toLowerCase());
                const statusMatch = filters.status === '' || character.status === filters.status;
                const speciesMatch = filters.species === '' || character.species === filters.species;
                const typeMatch = filters.type === '' || character.type === filters.type;
                const genderMatch = filters.gender === '' || character.gender === filters.gender;

                return nameMatch && statusMatch && speciesMatch && typeMatch && genderMatch;
            });
            setFilteredData(newFilteredData);
        }, 300); // Debounce delay: 300ms

        // Call the debounced filter function whenever filters change
        filterCharacters();

        // Cleanup function to cancel debounced filter on unmount
        return () => filterCharacters.cancel();
    }, [filters, characters]); // Listen to changes in filters and characters

    const getUniqueValues = (characters, field) => {
        const values = characters.map(character => character[field]);
        return [...new Set(values)];
    };

    const handleFilterChange = (field) => (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [field]: event.target.value
        }));
    };
    
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div style={styles.container}>
            <div style={styles.filterContainer}>
                <div style={styles.filterItem}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={filters.name}
                        onChange={handleFilterChange('name')}
                    />
                </div>
                <div style={styles.filterItem}>
                    <label htmlFor="status">Status</label>
                    <select id="status" value={filters.status} onChange={handleFilterChange('status')}>
                        <option value="">All</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div style={styles.filterItem}>
                    <label htmlFor="species">Species</label>
                    <select id="species" value={filters.species} onChange={handleFilterChange('species')}>
                        <option value="">All</option>
                        {speciesOptions.map(species => (
                            <option key={species} value={species}>{species}</option>
                        ))}
                    </select>
                </div>
                <div style={styles.filterItem}>
                    <label htmlFor="type">Type</label>
                    <select id="type" value={filters.type} onChange={handleFilterChange('type')}>
                        <option value="">All</option>
                        {typeOptions.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div style={styles.filterItem}>
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" value={filters.gender} onChange={handleFilterChange('gender')}>
                        <option value="">All</option>
                        {genderOptions.map(gender => (
                            <option key={gender} value={gender}>{gender}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div style={styles.cardsContainer}>
                {filteredData.map(character => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
    },
    cardsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
        justifyContent: 'center',
    },
    filterContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    filterItem: {
        display: 'flex',
        flexDirection: 'column',
    },
};

export default CharactersListPage;
