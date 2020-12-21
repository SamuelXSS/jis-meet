const express = require('express')
const socket = require('socket.io')
const routes = require('./routes.js')
const cors = require('cors')
require('./database')

const app = express()
app.use(cors());
app.use(express.json())
app.use(routes)
const io = socket(app.listen(3000), { cors: { origin: '*' } })


io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)
})