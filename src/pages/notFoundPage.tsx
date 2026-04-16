import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <main>
            You are lost, please come back home
            <div>
                <Link to="/">Back to Home</Link>
            </div>
        </main>
    )
}