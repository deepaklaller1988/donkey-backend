import { DataTypes } from 'sequelize';
import db from '../util/dbConn';


const BookMarks = db.define('bookmarks', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    media_id: {
      type: DataTypes.INTEGER,
    },
    media_type: {
        allowNull: false,
        type: DataTypes.STRING
    },
    bookmark_type: {
      type: DataTypes.STRING
    },
    imdb_id: {
      type: DataTypes.STRING
    },
});

BookMarks.sync()

export default BookMarks;