const User = require('../models/User')
const Interest = require('../models/Interest')

module.exports = {
    async index(req, res) {
        const interests = await Interest.findAll()

        return res.json(interests)
    },
    async show(req, res) {
        const { user_id } = req.params

        const user = await User.findByPk(user_id, {
            include: { association: 'interests', through: { attributes: [] } }
        })

        return res.json(user.interests)
    },
    async store(req, res) {
        const { user_id } = req.params
        const { name } = req.body

        const user = await User.findByPk(user_id)

        if (!user) {
            return res.status(400).json({ error: 'Esse usuário não foi encontrado!' })
        }

        const [interest] = await Interest.findOrCreate({
            where: { name }
        })

        await user.addInterest(interest)

        return res.status(200).json({ success: 'Novo interesse adicionado com sucesso!', interest })
    },
    async delete(req, res) {
        const { user_id, interest_id } = req.params

        const user = await User.findByPk(user_id)

        if (!user) {
            return res.status(400).json({ error: 'Esse usuário não foi encontrado!' })
        }

        const interest = await Interest.findByPk(interest_id)

        await user.removeInterest(interest)

        return res.status(200).json({ success: 'Novo interesse removido com sucesso!' })
    }
}