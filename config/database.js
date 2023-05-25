//const mysql = require("mysql2");
require('dotenv').config();

var connection = null;
if(process.env.USING_DATABASE== "postgre"){
  console.log("using postgre");
  connection = require('../config/postgreSQL');
}else if(process.env.USING_DATABASE== "mysql"){
  console.log("using mysql");
  connection = require('../config/mysqlDB');
}else{
  console.log("please choose a database!!");
  exit();
}
module.exports = connection;