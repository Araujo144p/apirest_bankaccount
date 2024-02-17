const Account = require("../models/Account");

class AcountController{
    async index(req, res){
        return res.json({msg: "tudo ok!!!"})
    }

    async newAccount(req, res){
        var {name, email, password, cpf } = req.body
        
        if([email, password, cpf].some(campo => campo == undefined || campo == null)){
            return res.status(400).json({err: "some field is empty"})
        }

        var result = await Account.create(name, email, password, cpf)
        if(result){
            return res.send().status(201)
        }
        else{
            return res.status(400).json({err: "cpf or email already exists"})
        }
    }

    async update(req, res){
        var {name, email} = req.body
        if(!name && !email){
            return res.status(400).json({err: "fields are not defined"})
        }
        var { table } = req
        if(name === table[0].name){
            return res.status(400).json({err: "This name is already registered on your account"})
        }
        if(email === table[0].email){
            return res.status(400).json({err: "This email is already registered on your account"})
        }

        var uuid = table[0].uuid

        var update = await Account.communUpdateAccount(name, email, uuid)
        if(update){
            return res.send().status(200)
        }
        else{
            return res.status(400).json({err: "Email already exists"})
        }
        
    }

    async account(req, res){
        var { table } = req
        var account = {
            name: table[0].name,
            email: table[0].email,
            cpf: table[0].cpf,
            balance: table[0].balance
        }

        return res.status(200).json(account)
    }

    async delete(req, res){
        var { table } = req
        var uuid = table[0].uuid

        await Account.deleteAcount(uuid)
        res.send().status(200);
    }
}

module.exports = new AcountController();