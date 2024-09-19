import { DataTypes } from "sequelize";

const PostModel = (db) => {
    return db.define("post", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        content: DataTypes.TEXT,
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });
};

export default PostModel;
