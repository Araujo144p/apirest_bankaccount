var knex = require("../database/connection")
var {v4: uuidv4} = require('uuid')
var bcrypt = require("bcrypt")

class Account{
    async create(name, email, password, cpf){
        var alreadyExist = await this.custumerAlreadyExist(email, cpf) 

        if(alreadyExist){
            return false
        }
        
        var salt = await bcrypt.genSalt(10)
        var hash = await bcrypt.hash(password, salt)
        
        try {
            await knex.insert({
                name,
                email,
                password: hash,
                cpf,
                uuid: uuidv4()
            }).table("accounts")


            return true
        } 
        catch(err) {
            console.log(err)
        }
    }

    async custumerAlreadyExist(email, cpf){
        try {
            var table = await knex.select().where({cpf}).orWhere({email}).table("accounts")
            if(table[0] === undefined){
                return false
            }
            else{
                return true
            }
        } catch(err) {
          console.log(err)  
        }
    }

    async communUpdateAccount(name, email, uuid){
        try {
            var account = {}
            if(name !== undefined){
                account.name = name
            }
            if(email !== undefined){
                var exists = await this.custumerAlreadyExist(email, '')
                if(exists === false){
                    account.email = email
                }
                else{
                    return false   
                }   
            }
            await knex.update(account).where({uuid}).table("accounts")
            return true
        } 
        catch (err) {
            console.log(err)
        }   
    }
    
    async deleteAcount(uuid){
        try {
            await knex.delete().where({uuid}).table("accounts")    
        } 
        catch(err) {
            console.log(err)
        }
    }
}

module.exports = new Account();