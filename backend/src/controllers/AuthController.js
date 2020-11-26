const User = require('../models/User')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')


module.exports = {
    async store(req, res){
        const { username, pass } = req.body

        if(username == '' || pass == ''){
            return res.status(400).json({error: 'Insira todos os dados para logar!'})
        }
        
        const user = await User.findOne({ where: { username } })
        
        if(user){
            if(bcrypt.compareSync(pass, user.pass)){
                const payload = { id: user.id, user: user.username, name: user.name }
                const token = jwt.encode(payload, process.env.APP_SECRET)
                await User.update({token}, { where: { username } })
                res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    token
                })
            } else{
                return res.status(401).json({error: 'Usuário ou senha inválida'})
            }
                
        } else{
            return res.status(400).json({error: 'Usuário não encontrado!'})
        }
    }
}