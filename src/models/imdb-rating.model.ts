import { DataTypes } from 'sequelize';
import db from '../util/dbConn';


const IMDBRating = db.define('imdb_ratings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    media_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    media_type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    imdb_rating: {
      type: DataTypes.DOUBLE
    },
    cached_date: {
      type: DataTypes.DATE
    },
});

IMDBRating.sync()

export default IMDBRating;