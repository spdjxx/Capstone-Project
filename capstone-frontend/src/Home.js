import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import backendUrl from "./backendUrl";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [name, setName] = useState("");
    const [events, setEvents] = useState([]); // State for events
    const [newEvent, setNewEvent] = useState("");

    useEffect(() => {
        const makeAPICall = async () => {
            let url = backendUrl();

            const res = await fetch(url + `/post`);
            const data = await res.json();
            setPosts(data.posts);
        };
        makeAPICall();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let url = backendUrl();

        const res = await fetch(url + `/post`, {
            method: "POST",
            // method to send request to server
            headers: {
                "Content-Type": "application/json",
            },
            // sending JSON data
            body: JSON.stringify({
                // convert object to string
                name,
                // send name
                content: newPost,
                // sends content
            }),
        });
        const data = await res.json();
        setPosts(data.posts);

        setNewPost(""); // clears the text area after submitting
        setName("");
    };

    const createPost = (event) => {
        setNewPost(event.target.value); // Update the newPost state
    };

    const handleNameChange = (event) => {
        setName(event.target.value); // Update the name state
    };

    const handleLike = async (postId) => {
        const res = await fetch(`${backendUrl()}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId,
            }),
        });

        const data = await res.json();
        setPosts(data.posts);
    };

    const handleEventSubmit = (event) => {
        event.preventDefault();
        setEvents([...events, newEvent]); // Add new event to the list
        setNewEvent(""); // Clear input
    };

    return (
        <div className="mainPage">
            <div className="row">
                <div className="col-3"></div>
                <div
                    className="col-6"
                    style={{
                        background: "white",
                        padding: 10,
                        border: "1px solid gray",
                        marginBottom: 20,
                        borderRadius: 10,
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nameInput" className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nameInput"
                            placeholder="Your name"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <label
                            htmlFor="titleInput"
                            className="form-label"
                        ></label>
                        <textarea
                            className="form-control"
                            id="titleInput"
                            placeholder="Post a new update for parents."
                            style={{ width: "100%" }}
                            onChange={(e) => setNewPost(e.target.value)}
                        ></textarea>
                        <div className="text-center">
                            <button className="btn btn-secondary">📸</button>
                            <button className="btn btn-secondary">🎥</button>
                            <button
                                type="submit"
                                className="btn btn-primary post-btn"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="posts-list">
                {posts.map((post, index) => (
                    <div key={index} className="post-box">
                        <p>
                            <strong>{post.name}</strong> - {post.createdAt}
                        </p>
                        <p>{post.content}</p>
                        <div className="post-actions">
                            <button onClick={() => handleLike(post.id)}>
                                Like ({post.likes})
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Event List */}
            <div className="events-list">
                <h3>Upcoming Events</h3>
                <form onSubmit={handleEventSubmit}>
                    <input
                        type="text"
                        value={newEvent}
                        onChange={(e) => setNewEvent(e.target.value)}
                        placeholder="Add new event"
                    />
                    <button type="submit">+</button>
                </form>
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>{event}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
