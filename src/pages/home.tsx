import { useMemo, useState } from "react";
import ConcertList from "../components/concerts/ConcertList";
import FilterBar from "../components/concerts/FilterBar";
import { concerts } from "../data/concerts";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const cities = useMemo(() => {
    return Array.from(new Set(concerts.map(c => c.city))).sort();
  }, [])
  const genres = useMemo(() => {
    return Array.from(new Set(concerts.map(c => c.genre))).sort();
  }, [])

  const filteredConcerts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return concerts.filter((c) => {
      const matchesSearch = term.length === 0 ||
        c.title.toLowerCase().includes(term) ||
        c.city.toLowerCase().includes(term) ||
        c.artist.toLowerCase().includes(term);

      const matchesCity = selectedCity === 'All' || c.city === selectedCity;
      const matchesGenre = selectedGenre === 'All' || c.genre === selectedGenre;
      const matchesAvailability = !onlyAvailable || c.status === 'AVAILABLE'
      return matchesSearch && matchesGenre && matchesCity && matchesAvailability;
    })
  }, [searchTerm, selectedCity, selectedGenre, onlyAvailable]);
  function handleResetFilters() {
    setSearchTerm('');
    setSelectedCity('All');
    setSelectedGenre('All');
    setOnlyAvailable(false);
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <FilterBar
        searchTerm={searchTerm}
        onChangeSearchTerm={setSearchTerm}
        selectedCity={selectedCity}
        cities={cities}
        onSelectedCityChange={setSelectedCity}
        selectedGenre={selectedGenre}
        genres={genres}
        onSelectedGenreChange={setSelectedGenre}
        onlyAvailable={onlyAvailable}
        onOnlyAvailableChange={setOnlyAvailable}
        onResetFilters={handleResetFilters}
      ></FilterBar>
      <div className="my-3 flex justify-end">
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted shadow-card">
          Results: {filteredConcerts.length}
        </span>
      </div>

      {filteredConcerts.length == 0 ?
        <section>
          <h2>No results found</h2>
          <p>Try changing the filters or reset them :D</p>
        </section>
        :

        <ConcertList concerts={filteredConcerts}></ConcertList>
      }
    </main>
  )
}