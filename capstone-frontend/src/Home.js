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
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");

    useEffect(() => {
        const makeAPICall = async () => {
            let url = backendUrl();

            try {
                const res = await fetch(url + `/post`);
                if (!res.ok) {
                    throw new Error(
                        `Failed to fetch posts: ${res.status} ${res.statusText}`
                    );
                }
                const data = await res.json();
                setPosts(data.posts);
            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }

            try {
                const eventRes = await fetch(url + `/event`);
                if (!eventRes.ok) {
                    throw new Error(
                        `Failed to fetch events: ${eventRes.status} ${eventRes.statusText}`
                    );
                }
                const eventData = await eventRes.json();
                setEvents(eventData.events);
            } catch (error) {
                console.error("Error fetching events:", error.message);
            }
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

        if (!res.ok) {
            throw new Error(
                `Failed to create post: ${res.status} ${res.statusText}`
            );
        }

        const data = await res.json();
        setPosts(data.posts);

        setNewPost(""); // clears the text area after submitting
        setName("");
    };

    // const createPost = (event) => {
    //     setNewPost(event.target.value); // Update the newPost state
    // };

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

    const handleEventSubmit = async (event) => {
        event.preventDefault();

        if (!eventDate || !eventTime) {
            alert("Please select a date and time for the event.");
            return;
        }

        const eventObj = {
            name: newEvent,
            date: eventDate,
            // time: eventTime,
        };

        let url = backendUrl();
        try {
            const res = await fetch(url + "/event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventObj),
            });
            if (!res.ok) {
                throw new Error(
                    `Failed to create event: ${res.status} ${res.statusText}`
                );
            }
            const data = await res.json();
            setEvents([...events, data.event]); // Add new event to the list
            setNewEvent(""); // Clear input
            setEventDate("");
            // setEventTime("");
        } catch (error) {
            console.error("Error submitting event:", error.message);
        }
    };

    // const formatTime = (time) => {
    //     const [hours, minutes] = time.split(":");
    //     const formattedHours = hours % 12 || 12; // Converts to 12-hour format
    //     const ampm = hours < 12 ? "AM" : "PM"; // Determines AM/PM
    //     return `${formattedHours}:${minutes} ${ampm}`;
    // };

    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const dateObj = new Date(date);

        const formattedDate = dateObj.toLocaleDateString("en-US", options);

        // Adding 'st', 'nd', 'rd', 'th' to the day
        const day = dateObj.getDate();
        let daySuffix;

        if (day === 1 || day === 21 || day === 31) {
            daySuffix = "st";
        } else if (day === 2 || day === 22) {
            daySuffix = "nd";
        } else if (day === 3 || day === 23) {
            daySuffix = "rd";
        } else {
            daySuffix = "th";
        }

        return formattedDate.replace(/\d+/, day + daySuffix);
    };

    // Function to format event display
    const formatEventDateTime = (event) => {
        const formattedDate = new Date(event.date).toLocaleDateString(); // Formats the date
        // const formattedTime = formatTime(event.time); // Formats the time
        return `${formattedDate}' ;
        `;
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
                    <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                    {/* <input
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                    /> */}
                    <button type="submit">+</button>
                </form>
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>
                            <strong className="event-name">
                                {event ? event.name : "No name"}
                            </strong>
                            <p className="event-date-time">
                                {event
                                    ? formatEventDateTime(event)
                                    : "No Date/Time"}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
