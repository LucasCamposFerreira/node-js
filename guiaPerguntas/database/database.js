const Sequelize = require("sequelize");

const connection = new Sequelize("guia-perguntas","root","Sucesso@2022",{
  host: "localhost",
  dialect:"mysql"
});

module.exports = connection; 