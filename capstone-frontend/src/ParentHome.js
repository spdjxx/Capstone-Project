import React from "react";
import backendUrl from "./backendUrl";
import { useState, useEffect } from "react";

console.log(backendUrl);

function ParentHome() {
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);

    // Fetch posts and events from the backend when the component loads
    useEffect(() => {
        const fetchData = async () => {
            let url = backendUrl();

            // Fetch posts
            const postRes = await fetch(url + `/post`);
            const postData = await postRes.json();
            setPosts(postData.posts);

            // Fetch events
            const eventRes = await fetch(url + `/events`);
            const eventData = await eventRes.json();
            setEvents(eventData.events);
        };

        fetchData();
    }, []);

    return (
        <div className="mainPage">
            <div className="posts-list">
                <h3>Updates for Parents</h3>
                {posts.map((post, index) => (
                    <div key={index} className="post-box">
                        <p>
                            <strong>{post.name}</strong> - {post.createdAt}
                        </p>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>

            <div className="events-list">
                <h3>Upcoming Events</h3>
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>{event}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ParentHome;
