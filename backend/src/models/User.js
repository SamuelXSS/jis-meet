const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            pass: DataTypes.STRING,
            token: DataTypes.STRING
        },{
            sequelize
        })
    }
        
    static associate(models){
        this.belongsToMany(models.Interest, { foreignKey: 'user_id', through:'interest_users', as: 'interests' })
        this.hasMany(models.Secret, { foreignKey: 'user_id', as: 'users' })
    }
}

module.exports = User;