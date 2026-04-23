import type { CartItem } from "../../types";
import Button from "../ui/Button";
import StateMessage from "../ui/StateMessage";
import CartItemRow from "./CartItemRow";

type Props = {
  items: CartItem[];
  onRemoveFromCart: (concertId: number) => void;
  onQtyChange: (concertId: number, qty: number) => void;
  onClearCart: () => void;
};

export default function CartPanel({ items, onRemoveFromCart, onClearCart, onQtyChange }: Props) {
  // const [totaTickets, setTotalTickets] = useState<number>(0);
  // function totalTicketsSum() {
  //     setTotalTickets(...)
  // }
  const totalTickets = items.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);;
  return (
    <aside className="rounded-card border w-1/3 border-border bg-surface p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-text">
          <h2 className="m-0 text-base font-semibold">Cart</h2>
        </div>

        <Button variant="secondary" onClick={onClearCart} disabled={items.length === 0}>
          Clear
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="mt-4">
          <StateMessage type="empty" title="Your cart is empty" description="Add tickets from the concerts list." />
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
              <CartItemRow
                key={`cart-item-row-${item.id}`}
                item={item}
                onRemoveFromCart={onRemoveFromCart}
                onQtyChange={onQtyChange}
              />
            ))}
          </div>

          <div className="mt-4 border-t border-border pt-3 text-sm text-text">
            <div className="flex items-center justify-between">
              <span className="text-muted">Total tickets</span>
              <span className="font-semibold">{totalTickets}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-muted">Total</span>
              <span className="font-semibold">${totalPrice}</span>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}