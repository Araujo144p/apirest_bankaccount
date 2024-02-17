const knex = require("../database/connection");

class Statement{
    async deposit(description, mount, account_uuid){
        try {
            await knex.insert({description, mount, type: "credit", account_uuid, created_at: new Date()}).table("statements") 
            var newBalance = await this.balance(mount, 'credit', account_uuid)   
            await knex.update({balance: newBalance}).where({uuid: account_uuid}).table("accounts")
        } 
        catch(err) {
            console.log(err)
        }
    }

    async findByCpf(cpf){
        try {
            var table = await knex.select().where({cpf}).table("accounts")
            if(table[0] === undefined){
                return undefined
            }
            else{
                return table[0]
            }    
        } 
        catch(err) {
            console.log(err)
        }
    }

    async showStatement(uuid){
        try {
            var table = await knex.select(["description", "mount", "type", "created_at"])
            .where({account_uuid: uuid}).table("statements")   
            if(table[0] !== undefined){
                return table
            } 
            else{
                return undefined
            }
        } 
        catch(err) {
            console.log(err)
        }
    }

    async withdraw(mount, account_uuid){
        try {
            var newBalance = await this.balance(mount, 'debit', account_uuid)
            if(newBalance === false){
                return false
            }
            else{
                await knex.insert({mount, account_uuid, type: "debit", created_at: new Date()}).table("statements")
                await knex.update({balance: newBalance}).where({uuid: account_uuid}).table("accounts")
                return newBalance
            }
        } 
        catch(err) {
            console.log(err)    
        }
    }

    async showStatementWithDate(uuid, date){
        try {
            var table = await knex.select(["description", "mount", "type", "created_at"])
            .where({account_uuid: uuid}).andWhereRaw('DATE(created_at) = ?',[date]).table("statements")   
            if(table[0] !== undefined){
            console.log("ate aqui funcionou")
                return table
            } 
            else{
                return undefined
            }
        } 
        catch(err) {
            console.log(err)
        }
    }

    async balance(mount, type, account_uuid){
        try {
            var account = await knex.select().where({uuid: account_uuid}).table('accounts')   
            var balance = account[0].balance 
        } 
        catch(err) {
            console.log(err)
        }
        var mountAndBalance = []
        mountAndBalance.push(balance, mount)
        if(type === 'credit'){
            var newBalance = mountAndBalance.reduce((total, valor)=> total + valor)
            return newBalance
        }
        if(type === 'debit'){
            if(mount > balance){
                return false
            }
            else{
                var newBalance = mountAndBalance.reduce((total, valor)=> total - valor)
                return newBalance
            }
        }
    }

}

module.exports = new Statement();