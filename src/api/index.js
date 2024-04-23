// Example API call using fetch
export const fetchCharacters = async () => {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.results;  // Assuming the API returns an object with a results array
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};
