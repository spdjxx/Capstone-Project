import { DataTypes } from "sequelize";

const EventModel = (db) => {
    return db.define("Event", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        // time: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
    });
};

export default EventModel;
