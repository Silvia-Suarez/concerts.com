import type { Concert } from "../../types"
import ConcertCard from "./ConcertCard";

type Props = {
  concerts: Concert[];
}

export default function ConcertList({ concerts }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {concerts.map((concert) =>
        <ConcertCard key={`concert-card-${concert.id}`} concert={concert}></ConcertCard>)}
    </section>
  )
}