import type { Concert } from "../../types"
import ConcertCard from "./ConcertCard";

type Props = {
    concerts: Concert[];
}

export default function ConcertList({ concerts }: Props) {
    return (
        <section>
            {concerts.map((concert) =>
                <ConcertCard key={`concert-card-${concert.id}`} concert={concert}></ConcertCard>)}
        </section>
    )
}