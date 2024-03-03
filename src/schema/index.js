require("dotenv").config();
require('../../moduleAlias.js')
try{
    require('./user.js');
}catch{
    console.log("Something went wrong in DB setup")
}
