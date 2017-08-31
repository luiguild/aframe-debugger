require('dotenv').config()
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
// const fetch = require('node-fetch')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

io.on('connection', socket => {
    socket.on('positionCardBoard', data => {
        console.log('New position on Card Board!')
        console.log('rotation', data.rotation)
        console.log('position', data.position)

        io.sockets.emit('positionDesktop', {
            position: data.position,
            rotation: data.rotation
        })
    })
})

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
