import { useState } from "react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <div>
            <h1>Sign Up</h1>
        </div>
    )
}