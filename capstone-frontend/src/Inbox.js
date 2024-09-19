import NavBar from "./NavBar";
import React, { useState } from "react";

const Inbox = () => {
    const [showModal, setShowModal] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [messageBody, setMessageBody] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null); // State for selected message

    const handleSendMessage = (event) => {
        event.preventDefault();

        if (recipient && messageBody) {
            const newMessage = { recipient, messageBody };
            setMessages([...messages, { recipient, messageBody }]);
            setRecipient(""); // Clear input after sending
            setMessageBody(""); // Clear input after sending
            setShowModal(false); // Close modal after sending
        }
    };

    return (
        <div className="inbox-container">
            <div className="message-list">
                <header id>
                    <h1>Messages</h1>
                </header>

                {/* Compose New Message Button */}
                <button
                    className="compose-icon-btn"
                    onClick={() => setShowModal(true)}
                >
                    <span class="material-symbols-outlined">edit_square</span>
                </button>

                {/* Right column: Display selected message */}
                <div className="message-thread">
                    {selectedMessage ? (
                        <>
                            <h2>Message to {selectedMessage.recipient}</h2>
                            <p>{selectedMessage.messageBody}</p>
                        </>
                    ) : (
                        <p>Select a message to view the thread</p>
                    )}
                </div>

                {/* Display sent messages in the middle of the page */}
                <div className="messages">
                    {messages.length === 0 ? (
                        <p>No messages yet.</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className="messageBox"
                                onClick={() => setSelectedMessage(msg)}
                                style={{
                                    backgroundColor:
                                        selectedMessage === msg
                                            ? "#ddd"
                                            : "transparent", // Highlight selected
                                    cursor: "pointer",
                                }}
                            >
                                <h4>To: {msg.recipient}</h4>
                                <p>{msg.messageBody}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Modal for composing a new message */}
                {showModal && (
                    <div className="modal fade show d-block">
                        <div className="modal-dialog-inbox">
                            <div className="modal-content-inbox">
                                <div className="modal-header-inbox">
                                    <div className="modal-body-inbox">
                                        <h2>Compose New Message</h2>
                                        <form onSubmit={handleSendMessage}>
                                            <label htmlFor="recipient">
                                                To:
                                            </label>
                                            <br />
                                            <input
                                                type="text"
                                                id="recipient"
                                                name="recipient"
                                                value={recipient}
                                                onChange={(event) =>
                                                    setRecipient(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Recipient"
                                                required
                                            />
                                            <br />
                                            <br />
                                            <label htmlFor="messageBody">
                                                Message:
                                            </label>
                                            <br />
                                            <textarea
                                                id="messageBody"
                                                name="messageBody"
                                                value={messageBody}
                                                onChange={(event) =>
                                                    setMessageBody(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Write your message here..."
                                                rows="5"
                                                required
                                            ></textarea>
                                            <br />
                                            <br />
                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                            >
                                                Send
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                            ></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
