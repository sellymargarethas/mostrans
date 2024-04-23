import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CharacterDetailPage = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackToList = () => {
        navigate(-1);
    };

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCharacter(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error.message);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading character: {error}</p>;

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                {character && (
                    <div style={styles.card}>
                        <img src={character.image} alt={character.name} style={styles.image} />
                        <div style={styles.content}>
                            <h1 style={styles.header}>{character.name}</h1>
                            <p style={styles.text}><strong>Status:</strong> {character.status}</p>
                            <p style={styles.text}><strong>Species:</strong> {character.species}</p>
                            <p style={styles.text}><strong>Gender:</strong> {character.gender}</p>
                            <p style={styles.text}><strong>Origin:</strong> {character.origin.name}</p>
                            <p style={styles.text}><strong>Last known location:</strong> {character.location.name}</p>
                            <Link style={styles.backButton} onClick={handleBackToList}>Back to List</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Styles for the component
const styles = {
    page: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        width: '100%',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        maxWidth: '800px',
        width: '100%',
    },
    image: {
        width: '40%',
        height: 'auto',
        objectFit: 'cover',
    },
    content: {
        padding: '20px',
        flex: 1,
    },
    header: {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#333',
    },
    text: {
        fontSize: '16px',
        marginBottom: '5px',
        color: '#666',
    },
    input: {
        marginBottom: '10px',
        padding: '8px',
        fontSize: '16px',
        border: '1px solid #70ba94', // Change border color to white
        borderRadius: '5px',
        width: '100%',
    },    
    assignButton: {
        backgroundColor: '#108c4c',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'center',
        marginRight: '10px',
        marginBottom: '20px',
    },
    backButton: {
        textDecoration: 'none',
        color: 'white',
        backgroundColor: '#108c4c',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'center',
    }
};

export default CharacterDetailPage;