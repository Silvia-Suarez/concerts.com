import { Link, useParams } from "react-router-dom";
import type { Concert } from "../types";
import { useEffect, useState } from "react";
import { getConcertById } from "../services/eventsServics";
import StateMessage from "../components/ui/StateMessage";
import Badge from "../components/ui/Badge";
import { formatPriceCOP } from "../lib/formats";
import Button from "../components/ui/Button";

type Props = {
    onAddToCart: (concert: Concert) => void;
}

export default function ConcertDetailsPage({ onAddToCart }: Props) {
    const { concertId } = useParams<{ concertId: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [concert, setConcert] = useState<Concert | null>(null);

    const concertIdNumber = concertId ? Number.parseInt(concertId) : Number.NaN
    async function loadConcert() {
        try {
            const response = await getConcertById(concertIdNumber);
            if (!response) {
                setLoading(false);
                setError("Server Error, try again later");
                setConcert(null);
            }
            console.log("res: ", response);
            setConcert(response);
        }
        catch (e) {
            setError(e instanceof Error ? e.message : "Error loading the concert");
            setConcert(null);
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        console.log("concertId", concertId);
        console.log("concertIdNumber", concertIdNumber);
        if (!concertId) {
            setLoading(false);
            setError("There is no concert with that id")
        }

        void loadConcert();
        console.log("concert", concert)
    }, [concertIdNumber])

    if (loading) {
        return (
            <main className="mx-auto max-w-6xl p-6">
                <StateMessage type="loading" title="Loading Concert..." description="We are connecting to the db"></StateMessage>
            </main>
        )
    }

    if (error) {
        return (<main className="mx-auto max-w-6xl p-6">
            <StateMessage
                type="error"
                title="Error"
                description={error}
                actionText="Retry"
                onAction={() => window.location.reload()}
            ></StateMessage>
            <div>
                <Link to="/">Back to Home</Link>
            </div>
        </main>
        )
    }

    if (!concert) {
        return (
            <main className="mx-auto max-w-6xl p-6">
                <StateMessage type="empty" title="No concert to show"></StateMessage>
            </main>
        )
    }
    const isSold = concert.status === "SOLD_OUT";

    return (
        <main className="mx-auto max-w-3xl p-6">
            <div className="mb-6">
                <Link to="/" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                    ← Back to home
                </Link>
            </div>

            <article className="rounded-card border border-border bg-surface p-6 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="m-0 text-2xl font-semibold text-text">{concert.title}</h1>
                        <p className="mt-1 text-sm text-muted">{concert.genre}</p>
                    </div>
                    <Badge variant={isSold ? "danger" : "success"}>{isSold ? "Sold out" : "Available"}</Badge>
                </div>

                <dl className="mt-6 space-y-3 text-sm">
                    <div>
                        <dt className="font-semibold text-text">Date</dt>
                        <dd className="m-0 text-muted">{concert.date}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-text">City</dt>
                        <dd className="m-0 text-muted">{concert.city}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-text">Artist</dt>
                        <dd className="m-0 text-muted">{concert.artist}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-text">Price</dt>
                        <dd className="m-0 text-lg font-semibold text-text">{formatPriceCOP(concert.price)}</dd>
                    </div>
                </dl>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1">
                        <Button disabled={isSold} variant="primary" fullWidth onClick={() => onAddToCart(concert)}>
                            Add to cart
                        </Button>
                    </div>
                    <Link to="/cart" className="inline-flex flex-1 items-center justify-center gap-2 rounded-btn border border-border bg-surface px-3 py-2 text-center text-sm font-medium text-text transition hover:bg-gray-50 focus:ring-2 focus:ring-brand-300">
                        View cart
                    </Link>
                </div>
            </article>
        </main>
    );
}