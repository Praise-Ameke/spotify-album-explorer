import "./SearchBar.css";// Import the CSS styles for this component

type SearchBarProps = {
    artist: string
    setArtist: React.Dispatch<React.SetStateAction<string>>
    onSearch: () => void
}

function SearchBar({ 
    artist,
    setArtist,
    onSearch }: SearchBarProps) {
    return (
        <form>
            <input
                type="text"
                placeholder="Search for an artist..."
                value={artist}
                onChange={(event) => setArtist(event.target.value)}
            />
            <button type="button" onClick={onSearch}>Search</button>
        </form>

    )

}

export default SearchBar