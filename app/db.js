import Sequelize from 'sequelize';
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

const Reply = sequelize.define('reply', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: Sequelize.STRING,
    unique: true
  },
  response: {
    type: Sequelize.STRING
  }
});

export const getReplies = async () => {
  return await Reply.findAll();
};

export const getRepliesById = async (id) => {
  return await Reply.findAll({ where: { id } });
};

export const getRepliesByKey = async (key) => {
  return await Reply.findAll({ where: { key } });
};