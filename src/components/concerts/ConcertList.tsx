import type { Concert } from "../../types"
import ConcertCard from "./ConcertCard";

type Props = {
  concerts: Concert[];
  onAddToCart: (concert: Concert) => void;
}

export default function ConcertList({ concerts, onAddToCart }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:w-2/3">
      {concerts.map((concert) =>
        <ConcertCard key={`concert-card-${concert.id}`} concert={concert} onAddToCart={onAddToCart}></ConcertCard>)}
    </section>
  )
}