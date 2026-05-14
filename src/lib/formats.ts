/** Formato de moneda para precios en COP (sin decimales). */
export function formatPriceCOP(amount: number): string {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  