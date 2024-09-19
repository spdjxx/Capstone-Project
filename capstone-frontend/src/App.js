import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import Login from "./Login.js";
import Inbox from "./Inbox.js";
import Settings from "./Settings.js";
import SignUpModal from "./SignUpModal";
import NavBar from "./NavBar";
import ParentHome from "./ParentHome.js";

const myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login", // This is no longer going to be used, so rename it to make things less confusing
        element: <Login />,
    },
    {
        path: "/Inbox",
        element: <Inbox />,
    },
    {
        path: "/Settings",
        element: <Settings />,
    },
    {
        path: "/Parents",
        element: <ParentHome />,
    },
]);

function App() {
    return (
        <div>
            <NavBar />
            <RouterProvider router={myRoutes} />
        </div>
    );
}

export default App;
