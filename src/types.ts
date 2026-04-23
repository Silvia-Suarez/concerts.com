export type ConcertStatus = "AVAILABLE" | "SOLD_OUT";

export interface Concert {
  id: number;
  title: string;
  date: string;
  genre: string;
  city: string;
  price: number;
  artist: string;
  status: ConcertStatus;
}
export interface CartItem extends Concert{
  // concert: Concert;
  qty: number;
}