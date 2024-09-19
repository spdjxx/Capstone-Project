import { DataTypes } from "sequelize";

const LikeModel = (db) => {
    return db.define(
        "like",
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            indexes: [{ unique: true, fields: ["userId", "postId"] }],
        }
    );
};

export default LikeModel;
