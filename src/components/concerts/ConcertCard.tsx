import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Concert } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { formatPriceCOP } from "../../lib/formats";

type Props = {
  concert: Concert;
  onAddToCart: (concert: Concert) => void;
}

export default function ConcertCard({ concert, onAddToCart }: Props) {
  // 5=='5' true
  // 5==='5' false
  const isSold = concert.status === "SOLD_OUT";
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const t = window.setTimeout(() => setJustAdded(false), 500);
    return () => window.clearTimeout(t);
  }, [justAdded]);

  function onClickAddToCart(concert: Concert) {
    onAddToCart(concert);
    setJustAdded(true);
  }
  return (
    <article className="rounded-card border border-border bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="m-0 text-base font-semibold text-brand-400 ">
            <Link to={`/concerts/${concert.id}`}>
              {concert.title}
            </Link>
          </h3>
          <span className="block mt-1 text-xs text-muted"> {concert.genre}</span>
        </div>
        <Badge variant={isSold ? "danger" : "success"}>
          <span>
            {isSold ? "Sold out" : "Available"}
          </span>
        </Badge>
      </div>
      <div className="mt-3 space-y2 text-sm text-text">
        <p className="m-0">
          <span className="font-semibold">Date: </span>
          <span className="text-muted">{concert.date}</span>
        </p>
        <p className="m-0">
          <span className="font-semibold">City: </span>
          <span className="text-muted">{concert.city}</span>
        </p>
        <p className="m-0">
          <span className="font-semibold">Artist: </span>
          <span className="text-muted">{concert.artist}</span>
        </p>
      </div>
      <p className="m-0 font-semibold text-text">{formatPriceCOP(concert.price)}</p>
      <div className="underline m-0 text-sm text-right ml-auto w-full font-semibold text-muted ">
        <Link to={`/concerts/${concert.id}`}>
          View Details
        </Link>
      </div>
      <div className="mt-4 flex intems-center justify-between">
        <Button
          disabled={isSold}
          variant={justAdded ? "success" : "primary"}
          fullWidth={true}
          onClick={() => onClickAddToCart(concert)}
        >
          {justAdded ? "Added" : "Add To Cart"}
        </Button>
      </div>
    </article>
  )
}