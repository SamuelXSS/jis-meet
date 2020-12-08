const { associate } = require('../models/Secret')
const Secret = require('../models/Secret')
const User = require('../models/User')

module.exports = {
    async show (req, res) { 
        const number = await Secret.count()

        return res.json(number)
    },
    async index (req, res) {
        const secrets = await Secret.findAll({include: { association: 'users', attributes:['name'] }})

        return res.json(secrets)
    },
    async store(req, res){
        const { user_id } = req.params
        const { name, secret, color1, color2, text_color } = req.body

        const user = await User.findByPk(user_id)

        if(!user){
            return res.status(404).json({ error: 'Não foi possível encontrar esse usuário!' })
        }

        if(secret == ''){
            return res.status(400).json({error: 'Infelizmente não é possível não contar um segredo :( Diga alguma coisa!'})
        }
        
        const tellSecret = await Secret.create({
            name,
            color1,
            color2,
            secret,
            text_color,
            user_id
        })

        return res.status(200).json({success: 'Segredo contado com sucesso! Vá no arquivo para vê-lo.', tellSecret})
    }
}