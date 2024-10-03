import express from "express";
import cors from "cors";
import { db, Post, User, Event } from "./db/db.js";

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.send({ server: "running" });
});

server.get("/post", async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [["createdAt", "DESC"]], // Sort by the 'createdAt' column in descending order
        });
        res.send({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Error fetching posts");
    }
});

server.post("/post", async (req, res) => {
    await Post.create(req.body);
    res.send({ posts: await Post.findAll() });
});

server.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, classKey, userType } =
            req.body;

        // Save user to the database
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            classKey,
            userType,
        });
        res.status(201).send({ message: "User created", user: newUser });
    } catch (error) {
        res.status(500).send({ error: "Error creating user" });
    }
});

server.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res
                .status(400)
                .send({ message: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ where: { email } });

        // If the user does not exist
        if (!user) {
            return res
                .status(401)
                .send({ message: "Invalid email or password" });
        }

        // Check password
        if (user.password !== password) {
            return res
                .status(401)
                .send({ message: "Invalid email or password" });
        }

        // Successful login
        res.status(200).send({ message: "Login successful", user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({
            error: "Error logging in, please try again later.",
        });
    }
});

server.post("/event", async (req, res) => {
    try {
        const { name, date } = req.body;
        console.log(req.body);

        const newEvent = await Event.create({ name, date });
        res.status(201).send({ message: "Event created", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send({ error: "Error creating event" });
    }
});

server.get("/event", async (req, res) => {
    try {
        const events = await Event.findAll({
            order: [["date", "DESC"]],
        });
        res.send({ events });
    } catch (error) {
        console.error("Error fetching events:", error.message); // Log full error
        res.status(500).send(`Error fetching events: ${error.message}`); // Return full error to client
    }
});

server.post("/message", async (req, res) => {
    try {
        const { recipient, messageBody } = req.body;
        const newMessage = await Message.create({ recipient, messageBody });
        res.status(201).send({ message: "Message sent", message: newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send({ error: "Error sending message" });
    }
});

server.get("/message", async (req, res) => {
    try {
        const messages = await Message.findAll({
            order: [["createdAt", "DESC"]], // Sort messages by creation date
        });
        res.send({ messages });
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).send(`Error fetching messages: ${error.message}`);
    }
});

server.listen(3001, "0.0.0.0", () => {
    console.log("server running");
});
