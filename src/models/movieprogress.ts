import { DataTypes } from 'sequelize';
import db from '../util/dbConn';


const MovieProgress = db.define('movieprogresses', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  media_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  media_type: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  progress_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
});
MovieProgress.associate = (models:any) =>{
  MovieProgress.belongsTo(models.User, { foreignKey: 'user_id' });
};
MovieProgress.sync()

export default MovieProgress;