import type { CartItem } from "../../types";
import Button from "../ui/Button";

type Props = {
    item: CartItem;
    onRemoveFromCart: (concertId: number) => void;
    onQtyChange: (concertId: number, qty: number) => void;
}
export default function CartItemRow({ item, onRemoveFromCart, onQtyChange }: Props) {
    const { title, city, price, qty,id } = item;
    return (
        <div className="flex items-center justify-between gap-3 rounded-card border border-border bg-surface p-3 shadow-card">
            <div className="min-w-0">
                <p className="m-0 truncate text-sm font-semibold text-text">{title}</p>
                <p className="mt-1 text-xs text-muted">
                    {city} • ${price}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <input
                    className="w-16 rounded-input border border-border bg-surface px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300"
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => onQtyChange(id, Number(e.target.value))}
                />

                <Button variant="danger" onClick={() => onRemoveFromCart(id)}>
                    Remove
                </Button>
            </div>
        </div>
    )
}