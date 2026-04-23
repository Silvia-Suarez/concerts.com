import type { Concert } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

type Props = {
  concert: Concert;
}

export default function ConcertCard({ concert }: Props) {
  // 5=='5' true
  // 5==='5' false
  const isSold = concert.status === "SOLD_OUT";
  return (
    <article className="rounded-card border border-border bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="m-0 text-base font-semibold text-text ">
            {concert.title}
          </h3>
          <span className="block mt-1 text-xs text-muted"> {concert.genre}</span>
        </div>
        <Badge variant={isSold ? "danger" : "success"}>
          <span>
            {isSold ? "Sold out" : "Available"}
          </span>
        </Badge>
        {/* <span>{isSold ? "Sold out" : "Available"}</span> */}
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
      <div className="mt-4 flex intems-center justify-between">
        <p className="m-0 font-semibold text-text">{concert.price}</p>
        <Button disabled={isSold} variant="primary" onClick={() => console.log("Add to cart")}>
          Add To Cart
        </Button>
      </div>
    </article>
  )
}