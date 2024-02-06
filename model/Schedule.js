const { Sequelize, DataTypes } = require('@sequelize/core')

const sequelize = new Sequelize('weeklyschedule', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

const Schedule = sequelize.define(
  'Schedule',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    module: {
      type: DataTypes.STRING,
    },
    prof: {
      type: DataTypes.STRING,
    },
    credit: {
      type: DataTypes.INTEGER,
    },
    niveau: {
      type: DataTypes.STRING,
    },
    date_: {
      type: DataTypes.DATE,
    },
    salle: {
      type: DataTypes.STRING,
    },
  },
  { tableName: 'schedule' }
)
module.exports = { Schedule, sequelize }
