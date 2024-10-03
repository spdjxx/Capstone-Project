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

server.post("/events", async (req, res) => {
    const { eventName, eventDate, isCanceled } = req.body;
    const newEvent = { eventName, eventDate, isCanceled };
});

server.get("/events", (req, res) => {
    res.json(allEvents);
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

server.listen(3001, "0.0.0.0", () => {
    console.log("server running");
});
