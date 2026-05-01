import { API_BASE_URLS } from "../config/api";
import type { Concert, ConcertStatus } from "../types";

type ApiEvento = {
  id?: unknown;
  title?: unknown;
  date?: unknown;
  genre?: unknown;
  city?: unknown;
  price?: unknown;
  artist?: unknown;
  status?: unknown;
  id_evento?: unknown;
  nombre_evento?: unknown;
  fecha_evento?: unknown;
  artista?: unknown;
  isActive?: unknown;
}
function toNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

/** Normaliza el estado que espera la UI (solo SOLD_OUT vs AVAILABLE). */
function toStatus(value: unknown): ConcertStatus {
  return value === "SOLD_OUT" ? "SOLD_OUT" : "AVAILABLE";
}

/** Convierte un objeto del API al tipo Concert que usa React en el resto de la app. */
function mapEventoToConcert(evento: ApiEvento): Concert {
  const fallbackId = Math.floor(Math.random() * 1000000);
  const id = toNumber(evento.id, fallbackId);
  const title =
    typeof evento.title === "string"
      ? evento.title
      : typeof evento.nombre_evento === "string"
        ? evento.nombre_evento
        : "Evento sin nombre";
  const date =
    typeof evento.date === "string"
      ? evento.date
      : typeof evento.fecha_evento === "string"
        ? evento.fecha_evento
        : "";
  const artist =
    typeof evento.artist === "string"
      ? evento.artist
      : typeof evento.artista === "string"
        ? evento.artista
        : "Artista por definir";
  const status = toStatus(evento.status);

  return {
    id,
    title,
    date,
    genre: typeof evento.genre === "string" ? evento.genre : "General",
    city: typeof evento.city === "string" ? evento.city : "Bogota",
    price: toNumber(evento.price, 0),
    artist,
    status,
  };
}



export async function getEventos() {
  const urls = ["/api/Eventos", ...API_BASE_URLS.map((baseUrl) => `${baseUrl}/api/Eventos`)]
  // const url = `http://localhost:5082/api/eventos`;
  let error = "";
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        error = `Respuesta ${response.status} en ${url}`;
        continue;
      }
      // La forma sencilla por que modifique el backend
      // return await response.json();

      // la forma si no hubiese modificado el backend
      const payload = (await response.json()) as unknown;
      if (!Array.isArray(payload)) {
        throw new Error("La respuesta no es un array");
      }
      return payload.map((item) => mapEventoToConcert(item as ApiEvento));
    } catch (e) {
      const catchedError = e instanceof Error ? e.message : `Error al consultar ${url}`;
      console.error(error, catchedError)
      throw new Error(catchedError);
    }
  }

  throw new Error("No fue posible obtener los datos del backend. No sé que pasó");
}