import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("You have logged out successfully!");
        navigate("/login");
    };

    const user = localStorage.getItem("user");

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="container-fluid" id="navBar">
                    <a className="navbar-brand">
                        <img
                            src="/favicon-32x32.png"
                            style={{ width: "20px", marginRight: "8px" }}
                        />
                        WillowsHaven
                    </a>
                    <div className="navbar-nav">
                        <a
                            className="nav-link active"
                            aria-current="page"
                            href="/"
                        >
                            Home
                        </a>
                        <a className="nav-link" href="/Inbox">
                            Inbox
                        </a>
                        <a className="nav-link" href="/Settings">
                            Settings
                        </a>
                        {user && (
                            <button
                                className="btn btn-secondary"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
