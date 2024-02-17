const Statement = require("../models/Statement");
const alreadyExist = require("../middleware/alreadyExist");

class StatementContoller{
    async deposit(req, res){
        var {description, mount} = req.body
        var {cpf} = req.headers;

        if(mount == undefined || mount == null){
            return res.status(400).json({err: "mount is not define"})
        }

        if(!cpf){
            return res.status(400).json({err: "cpf is not define at headers"})
        }

        var table = await Statement.findByCpf(cpf)

        if(table === undefined){
            return res.status(404).json({err: "cpf is not found"})
        }
        else{
            await Statement.deposit(description, mount, table.uuid)
            return res.send().status(201)
        }  
    }

    async show(req, res){
        var { date } = req.query
        
        var { table } = req
        var uuid = table[0].uuid
        if(date !== undefined){
            var table11 = await Statement.showStatementWithDate(uuid, date)
            if(table11 !== undefined)
                res.status(200).json(table11) 
            else
                res.status(404).json({err: "table not found"})
        }
        else{
            var table = await Statement.showStatement(uuid)
            if(table != undefined){
                return res.status(200).json(table)
            }
            else{
                return res.status(404).json({err: "statement not found"})
            }
        }   
    }

    async withdraw(req, res){
        var {mount} = req.body
        var { table } = req
        var uuid = table[0].uuid

        if(!mount){
            return res.status(400).json({err: "mount is not define"})
        }   

        var result = await Statement.withdraw(mount, uuid)
        if(result === false){
            return res.status(400).json({err: "insufficient funds"})
        }
        else{
            return res.send().status(200)
        }
    }
    
    

}

module.exports = new StatementContoller();