/** Ejemplo de consumo global del contexto: muestra sesión y llama `logout()` sin props desde `App`. */
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

type Props = {
  cartTotalQty?: number;
};

export default function NavBar({ cartTotalQty = 0 }: Props) {
  const { user, logout } = useAuth();
  const linkBase = "text-sm text-muted hover:text-text";
  const active = "text-brand-700 font-semibold text-text";

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-text">
          <h2 className="text-lg font-semibold">Concert.com</h2>
        </div>

        <nav className="flex flex-wrap items-center gap-4 text-sm text-muted" aria-label="Primary navigation">
          <NavLink to={"/"} className={({ isActive }) => (isActive ? `${linkBase} ${active}` : linkBase)}>
            Home
          </NavLink>
          <NavLink
            to={"/cart"}
            className={({ isActive }) =>
              `${isActive ? `${linkBase} ${active}` : linkBase} relative inline-flex items-center pr-1`
            }
          >
            Cart
            {cartTotalQty > 0 ? (
              <span
                className="absolute -right-2.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-0.5 text-[0.625rem] font-semibold leading-none text-white shadow-sm"
                aria-label={`${cartTotalQty} items in cart`}
              >
                {cartTotalQty > 99 ? "99+" : cartTotalQty}
              </span>
            ) : null}
          </NavLink>

          {user ? (
            <>
              <span className="max-w-[200px] truncate text-xs text-text sm:max-w-xs" title={user.email ?? undefined}>
                {user.email ?? "Sesión activa"}
              </span>
              <Button type="button" variant="secondary" onClick={logout}>
                Salir
              </Button>
            </>
          ) : (
            <>
              <NavLink to={"/login"} className={({ isActive }) => (isActive ? `${linkBase} ${active}` : linkBase)}>
                Log In
              </NavLink>
              <NavLink to={"/signup"} className={({ isActive }) => (isActive ? `${linkBase} ${active}` : linkBase)}>
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}