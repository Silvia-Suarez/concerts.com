import type { Concert } from "../../types";

type Props = {
    concert: Concert;
}

export default function ConcertCard({ concert }: Props) {
    // 5=='5' true
    // 5==='5' false
    const isSold = concert.status === "SOLD_OUT";
    return (
        <article className="card">
            <div>
                <h3>
                    {concert.title}
                </h3>
                <span> {concert.genre}</span>
            </div>
            <div>
                <span>{isSold? "Sold out":"Available"}</span>
            </div>
            <p>Date: {concert.date}</p>
            <p>City: {concert.city}</p>
            <p>Price: {concert.price}</p>

            <button disabled={isSold}>
                View details
            </button>
        </article>
    )
}