import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal"; // Import your SignUpModal component

const Login = () => {
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const openSignUpModal = () => {
        setSignUpModalOpen(true);
    };

    const closeSignUpModal = () => {
        setSignUpModalOpen(false);
    };

    return (
        <div>
            <div className="container" id="login">
                <h1>User Login</h1>
                <form onSubmit={(event) => event.preventDefault()}>
                    <div className="mb-3">
                        <label for="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
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
                        />
                    </div>
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
