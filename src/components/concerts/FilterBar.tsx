type Props = {
    searchTerm: string;
    onChangeSearchTerm: (value: string) => void;

    selectedCity: string;
    cities: string[];
    onSelectedCityChange: (value: string) => void;

    selectedGenre: string;
    genres: string[];
    onSelectedGenreChange: (value: string) => void;

    onlyAvailable: boolean;
    onOnlyAvailableChange: (value: boolean) => void;

    onResetFilters: () => void;
}
export default function FilterBar({
    searchTerm,
    onChangeSearchTerm, 
    selectedCity,
    cities,
    onSelectedCityChange,
    selectedGenre,
    genres,
    onSelectedGenreChange,
    onlyAvailable,
    onOnlyAvailableChange,
    onResetFilters
}: Props) {
    return (
        <section>
            <div>
                <label>
                    <span>
                        Search
                    </span>
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Title, city, artist..."
                        onChange={(e) => onChangeSearchTerm(e.target.value)}
                    />
                </label>
                <label>
                    <span>City</span>
                    <select
                        value={selectedCity}
                        onChange={(e) => onSelectedCityChange(e.target.value)}
                    >
                        <option value='All'>All</option>
                        {cities.map((c) =>
                            <option id={`city-${c}`} value={c}>{c}</option>
                        )}
                    </select>
                </label>
                <label>
                    <span>Genre</span>
                    <select
                        value={selectedGenre}
                        onChange={(e) => onSelectedGenreChange(e.target.value)}
                    >
                        <option value={'All'}>All</option>
                        {genres.map((g) =>
                            <option id={`genre-${g}`} value={g}>
                                {g}
                            </option>
                        )}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={onlyAvailable} onChange={(e) => onOnlyAvailableChange(e.target.checked)}
                    />
                    <span>Only Available</span>
                </label>
                <button onClick={onResetFilters}>
                    Reset filters
                </button>
            </div>
        </section>
    )
}