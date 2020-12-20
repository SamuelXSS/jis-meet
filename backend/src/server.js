const express = require('express')
const socket = require('socket.io')
const routes = require('./routes.js')
const cors = require('cors')
require('./database')

const app = express()
app.use(cors());
const io = socket(app.listen(3000), { cors: { origin: '*' } })

app.use(routes)
app.use(express.json())

io.on('connection', socket => {
    console.log('new conn')
})