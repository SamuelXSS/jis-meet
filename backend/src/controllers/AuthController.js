const User = require('../models/User')
const Secret = require('../models/Secret')
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
        const secret = await Secret.findAll({where: { user_id: user.id } })
        const quantity = await Secret.count({where: { user_id: user.id } })
        
        if(user){
            if(bcrypt.compareSync(pass, user.pass)){
                const payload = { id: user.id, user: user.username, name: user.name }
                const token = jwt.encode(payload, process.env.APP_SECRET)
                await User.update({token}, { where: { username } })
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        secrets: {
                            content: secret.secret,
                            color: secret.color,
                            quantity
                        }
                    }
                })
            } else{
                return res.status(401).json({error: 'Usuário ou senha inválida'})
            }
                
        } else{
            return res.status(400).json({error: 'Usuário não encontrado!'})
        }
    }
}