const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Secret = require('../models/Secret')
const User = require('../models/User')
const Interest = require('../models/Interest')


const connection = new Sequelize(dbConfig);

User.init(connection)
Secret.init(connection)
Interest.init(connection)

// Secret.associate(connection.models)
User.associate(connection.models)
Interest.associate(connection.models)

module.exports = connection;