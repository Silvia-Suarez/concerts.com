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
        <main className="mx-auto max-6xl p-6">

            <h1 className="font-bold m-0 text-xl text-muted">
                Concerts.com
            </h1>
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
            {filteredConcerts.length == 0 ?
                <section>
                    <h2>No results found</h2>
                    <p>Try changing the filters or reset them :)</p>
                </section>
                :

                <ConcertList concerts={filteredConcerts}></ConcertList>
            }
        </main>
    )
}