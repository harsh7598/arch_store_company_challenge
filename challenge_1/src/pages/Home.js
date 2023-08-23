import React, { useState, useEffect } from 'react';
import "./Home.css";
const API_URL = 'https://rickandmortyapi.com/api/character/';

function Home() {
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredCharacters = characters.filter(character => {
    const nameMatches = character.name.toLowerCase().includes(nameFilter.toLowerCase());
    const statusMatches = statusFilter === '' || character.status === statusFilter;
    const genderMatches = genderFilter === '' || character.gender === genderFilter;
    return nameMatches && statusMatches && genderMatches;
  });

  return (
    <div className="Home">
      <div className="filters">
        <input
          type="text"
          placeholder="Name"
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className="characters">
        {filteredCharacters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>Status: {character.status}</p>
      <p>Gender: {character.gender}</p>
      <button>Explore More</button>
    </div>
  );
}

export default Home;

