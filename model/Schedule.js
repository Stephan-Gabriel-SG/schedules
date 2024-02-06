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
    salle: {
      type: DataTypes.STRING,
    },
    credit: {
      type: DataTypes.DECIMAL,
    },
    niveau: {
      type: DataTypes.STRING,
    },
    date_: {
      type: DataTypes.DATE,
    },
  },
  { tableName: 'schedule' }
)
module.exports = { Schedule, sequelize }
