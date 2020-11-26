const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')

class Secret extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            secret: DataTypes.STRING,
        },{
            sequelize
        })
    }
        
    // static associate(models){
    //     this.hasOne(models.Dice, { foreignKey: 'Secret_id', as: 'dices' })
    // }
}

module.exports = Secret;