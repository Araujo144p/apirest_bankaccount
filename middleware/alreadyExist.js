const knex = require("../database/connection");

module.exports = async function(req, res, next){
    try {
        var {cpf} = req.headers;
        if(!cpf){
            return res.status(403).json({err: "account not define"})
        }
        var table = await knex.select().where({cpf}).table("accounts")
        
        if(table[0] == undefined){
            return res.status(404).json({err: "custumer not found"})
        }
        else{
            req.table = table
            next()
        }
    } catch(err) {
      console.log(err)  
    }

}