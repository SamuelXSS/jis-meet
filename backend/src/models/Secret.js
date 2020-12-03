const { Model, DataTypes } = require('sequelize');

class Secret extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            secret: DataTypes.STRING,
            color1: DataTypes.STRING,
            color2: DataTypes.STRING,
            text_color: DataTypes.STRING
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'secrets' })
    }
}

module.exports = Secret;