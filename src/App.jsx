import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import NavBar from './components/Navbar.jsx';
import CharactersListPage from './pages/CharactersListPage.jsx';
import CharacterDetailPage from './pages/CharacterDetailPage';
import CharactersByLocationPage from './pages/CharactersByLocationPage';

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <Routes>
        <Route path="/" element={<CharactersListPage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
        <Route path="/locations" element={<CharactersByLocationPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
