import { Sequelize } from "sequelize";
import PostModel from "./Post.js";
import UserModel from "./User.js";
import LikeModel from "./Likes.js";
import EventModel from "./Event.js";

let db;

if (process.env.DATABASE_URL === undefined) {
    console.log("Connected locally!");
    db = new Sequelize("postgres://localhost:5432/capstone", {
        logging: false,
    });
} else {
    db = new Sequelize(process.env.DATABASE_URL, {
        logging: false,
    });
}

const Post = PostModel(db);
const User = UserModel(db);
const Like = LikeModel(db);
const Event = EventModel(db);

User.hasMany(Like, { as: "PostLikes" });
Post.hasMany(Like, { as: "PostLikes" });
Like.belongsTo(User);
Like.belongsTo(Post);
User.hasMany(Event);
Event.belongsTo(User);

const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log("Connected to DB");

        db.sync(); //{ alter: true }
    } catch (error) {
        console.error(error);
        console.error("DB Connection FAILED!");
    }
};

await connectToDB();

export { db, Post, User, Like, Event };
