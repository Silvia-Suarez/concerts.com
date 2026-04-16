import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <div onClick={() => window.location.href = "/"}>
                {/* ICON */}
                <span>Concert.com</span>
            </div>
            <div>
                <NavLink to="/sign-up">Sign Up</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                {/* <NavLink to="/"></NavLink> */}
            </div>
        </nav>
    )
}