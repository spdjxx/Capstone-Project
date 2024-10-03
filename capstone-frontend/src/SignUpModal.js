import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backendUrl from "./backendUrl";

const SignUpModal = ({ onClose }) => {
    const [userType, setUserType] = useState(""); // Track user type
    const [classKey, setClassKey] = useState(""); // Track class key
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById("modal-backdrop").classList.add("show");
    }, []);

    const handleClose = () => {
        document.getElementById("modal-backdrop").classList.remove("show");
        onClose();
    };

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    const handleClassKeyChange = (event) => {
        setClassKey(event.target.value);
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        const userInfo = {
            firstName,
            lastName,
            email,
            password,
            classKey,
            userType,
        };

        let url = backendUrl();

        try {
            const response = await fetch(url + "/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User created:", data);
                handleClose(); // Close modal
                navigate(userType === "teacher" ? "/" : "/parents");
            } else {
                const errorData = await response.json();
                console.error("Error creating user");
                setError(errorData.message || "Error creating user.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Network error, please try again.");
        }

        if (userType === "teacher") {
            navigate("/");
        } else if (userType === "parent") {
            navigate("/parents");
        }

        handleClose();
    };

    return (
        <div id="modal-backdrop" className="modal-backdrop">
            <div className="modal-content">
                <button onClick={handleClose} className="close-button">
                    &times;
                </button>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="classKey" className="form-label">
                            Class Key
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="classKey"
                            value={classKey}
                            onChange={(e) => setClassKey(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => handleUserTypeChange("teacher")}
                        >
                            I'm a Teacher
                        </button>
                        <button
                            type="button"
                            onClick={() => handleUserTypeChange("parent")}
                        >
                            I'm a Parent
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpModal;
