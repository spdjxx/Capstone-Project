import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpModal from "./SignUpModal";
import backendUrl from "./backendUrl";

const Login = () => {
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const openSignUpModal = () => {
        setSignUpModalOpen(true);
    };

    const closeSignUpModal = () => {
        setSignUpModalOpen(false);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        let url = backendUrl();

        try {
            const res = await fetch(url + `/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                // Store user information in local storage (or a token)
                localStorage.setItem("user", JSON.stringify(data.user));
                alert("Login successful!");
                navigate("/"); // Redirect to home
            } else {
                const data = await res.json();
                alert(data.message || "Login failed!");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div>
            <div className="container" id="login">
                <h1 className="project-name">WillowsHaven</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label for="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Set email state
                        />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            } // Set password state
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" href="/">
                        Login
                    </button>

                    <h3>Not a user?</h3>
                    <button type="button" onClick={openSignUpModal}>
                        Sign Up
                    </button>
                </form>
            </div>
            {isSignUpModalOpen && <SignUpModal onClose={closeSignUpModal} />}
        </div>
    );
};

export default Login;
