import { DataTypes } from "sequelize";

const EventModel = (sequelize) => {
    return sequelize.define("Event", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
};

export default EventModel;
