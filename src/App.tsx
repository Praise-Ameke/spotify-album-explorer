import { useState } from 'react'
import './App.css'// Import the CSS styles for this component
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import { searchArtist } from './services/spotify'


function App() {
  // Store the artist name that the user is currently typing
  const [artist, setArtist] = useState("")

  function handleSearch() {
    searchArtist(artist)
  }


  return (
    <div>
      <Header />

      {/* Input where the user searches for artists */}
      <SearchBar
        artist={artist}
        setArtist={setArtist}
        onSearch={handleSearch} />

      {/* Display feedback as the user types */}
      <p>
        {artist === ""
          ? "Search for an artist to begin."
          : <>Currently searching for: <strong>{artist}</strong></>}
      </p>
    </div>
  )
}

export default App
