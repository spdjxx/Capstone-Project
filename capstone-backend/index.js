import express from "express";
import cors from "cors";
import { db, Post, User } from "./db/db.js";

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

server.post("/like", async (req, res) => {
    const { email, postId } = req.body;
    const user = await User.findOne({ where: { email } });

    // try {
    await Like.create({ userId: user.id, postId });
    res.status(200).send({ message: "Post liked" });
    // } catch (error) {
    //     res.status(500).send({ error: "Error liking post" });
    // }
});

server.delete("/like", async (req, res) => {
    const { userId, postId } = req.body;

    try {
        await Like.destroy({ where: { userId, postId } });
        res.status(200).send({ message: "Post unliked" });
    } catch (error) {
        res.status(500).send({ error: "Error unliking post" });
    }
});

server.listen(3001, "0.0.0.0", () => {
    console.log("server running");
});
