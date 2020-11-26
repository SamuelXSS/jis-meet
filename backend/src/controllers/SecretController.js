const Secret = require('../models/Secret')
const { Embed } = require('../config/embed')
module.exports = {
    async show (req, res) { 
        const number = await Secret.count()

        return res.json(number)
    },
    async index (req, res) {
        const secrets = await Secret.findAll()

        // const embed = {
        //     title: 'Teste',
        //     author: {
        //         name: secrets[0].name,
        //         avatar: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        //         url: 'http://localhost:3001'
        //     },
        //     url: 'http://localhost:3001',
        //     color: '#9834eb',
        //     thumbnail: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        //     description: secrets[0].secret,
        //     image: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        //     footer: {
        //         title: 'Teste JIS',
        //         thumbnail: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png'
        //     }
        // }
        // console.log(embed)
        // Embed(embed)

        return res.json(secrets)
    },
    async store(req, res){
        const { name, secret } = req.body

        if(secret == ''){
            return res.status(400).json({error: 'Infelizmente não é possível não contar um segredo :( Diga alguma coisa!'})
        }
        
        const tellSecret = await Secret.create({
            name,
            secret
        })

        return res.status(200).json({success: 'Segredo contado com sucesso! Vá no arquivo para vê-lo.', tellSecret})
    }
}