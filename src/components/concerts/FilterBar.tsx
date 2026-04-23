// Tipo de las props que recibe el componente FilterBar.
// Incluye los valores actuales de cada filtro y las funciones callback para actualizarlos.
import Button from "../ui/Button";

// Este patrón se llama "lifting state up": el estado vive en el padre (App) y se pasa al hijo.
type Props = {
  searchTerm: string;
  onChangeSearchTerm: (value: string) => void;
  genres: string[];
  selectedGenre: string;
  onSelectedGenreChange: (value: string) => void;
  cities: string[];
  selectedCity: string;
  onSelectedCityChange: (value: string) => void;
  onlyAvailable: boolean;
  onOnlyAvailableChange: (value: boolean) => void;
  onResetFilters: () => void;

}

// Componente de la barra de filtros.
// Contiene: campo de búsqueda, selectores de género y ciudad, checkbox y botón de reset.
export default function FilterBar({
  searchTerm,
  onChangeSearchTerm,
  genres,
  selectedGenre,
  onSelectedGenreChange,
  cities,
  selectedCity,
  onSelectedCityChange,
  onlyAvailable,
  onOnlyAvailableChange,
  onResetFilters
}: Props) {
  const inputBase =
    "w-full bg-transparent text-sm outline-none placeholder:text-gray-400";
  const fieldBase =
    "rounded-input border border-border bg-surface px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-brand-300";

  return (
    <section className="mt-2 rounded-card border border-border bg-surface p-4 shadow-card">
      <div className="grid gap-3 lg:grid-cols-3">
        <label className="flex flex-col gap-2">
          <span className="text-xs text-muted">Search</span>
          <div className={`flex items-center gap-2 ${fieldBase}`}>
            <input
              className={inputBase}
              type="text"
              value={searchTerm}
              placeholder="Title, artist, city..."
              onChange={(e) => onChangeSearchTerm(e.target.value)}
            />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs text-muted">Genre</span>
          <select
            className={`cursor-pointer ${fieldBase}`}
            value={selectedGenre}
            onChange={(e) => onSelectedGenreChange(e.target.value)}
          >
            <option value="All">All</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs text-muted">City</span>
          <select
            className={`cursor-pointer ${fieldBase}`}
            value={selectedCity}
            onChange={(e) => onSelectedCityChange(e.target.value)}
          >
            <option value="All">All</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => onOnlyAvailableChange(e.target.checked)}
          />
          Only available
        </label>

        <Button variant="secondary" onClick={onResetFilters}>
          Reset
        </Button>
      </div>
    </section>
  );
}