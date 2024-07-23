import { DataTypes } from 'sequelize';
import db from '../util/dbConn';

const SocialCounts = db.define('SocialCounts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    facebook_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    twitter_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,

    },
    messager_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,

    },
    reddit_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,

    },
    whatsapp_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,

    },
    telegram_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
});

SocialCounts.sync()

export default SocialCounts;