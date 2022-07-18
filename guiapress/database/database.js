const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress","root","Sucesso@2022",{
  host:"localhost",
  dialect: "mysql",
  timezone: "-03:00",
  logging: false
});

module.exports = connection;