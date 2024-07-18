import { DataTypes } from 'sequelize';
import db from '../util/dbConn';


const Ratings = db.define('ratings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movieId: {
        type: DataTypes.STRING,
    },
    ipAddress: {
      type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.STRING,
      },
    value: {
        type: DataTypes.STRING
    },
});

Ratings.sync()

export default Ratings;