import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
    useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import Login from "./Login.js";
import Inbox from "./Inbox.js";
import Settings from "./Settings.js";
import NavBar from "./NavBar";
import ParentHome from "./ParentHome.js";
import SignUpModal from "./SignUpModal";
import { ToastContainer, toast } from "react-toastify";

const ProtectedRoute = ({ component: Component }) => {
    const user = localStorage.getItem("user");
    const location = useLocation();

    if (!user) {
        alert("You need to log in to view this page.");
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Component />;
};

const myRoutes = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <NavBar />
                <ProtectedRoute component={Home} />
            </>
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/Inbox",
        element: (
            <>
                <NavBar />
                <ProtectedRoute component={Inbox} />
            </>
        ),
    },
    {
        path: "/Settings",
        element: (
            <>
                <NavBar />
                <ProtectedRoute component={Settings} />
            </>
        ),
    },
    {
        path: "/Parents",
        element: (
            <>
                <NavBar />
                <ProtectedRoute component={Settings} />
            </>
        ),
    },
]);

function App() {
    return (
        <div>
            <RouterProvider router={myRoutes} />
            <ToastContainer />
        </div>
    );
}

export default App;
