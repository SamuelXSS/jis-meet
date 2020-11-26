const { Model, DataTypes } = require('sequelize');

class Interest extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
        },{
            sequelize
        })
    }
        
    static associate(models){
        this.belongsToMany(models.User, { foreignKey: 'interest_id', through:'interest_users', as: 'users' })
    }
}

module.exports = Interest;