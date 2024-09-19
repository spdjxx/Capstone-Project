import React from "react";

const NavBar = () => {
    return (
        <div class="container-fluid">
            <nav class="navbar navbar-expand navbar-light bg-light">
                <div class="container-fluid" id="navBar">
                    <a class="navbar-brand" href="#">
                        SDP
                    </a>
                    <div class="navbar-nav">
                        <a class="nav-link active" aria-current="page" href="/">
                            Home
                        </a>
                        <a class="nav-link" href="/Inbox">
                            Inbox
                        </a>
                        <a class="nav-link" href="/Settings">
                            Settings
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
