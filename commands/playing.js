const path = require('path')
require('dotenv').config({path: path.resolve(__dirname + '../.env')})
const io = require('socket.io-client')
var socket = io.connect(process.env.SERVER_ADDRESS)

function getPlaying(){
    return new Promise(resolve => {
        socket.emit('currently_playing')
        socket.on('playing_currently', response => {
            resolve(response)
        })
    })
}

module.exports = (client, target, context, msg) => {
    getPlaying()
    .then(data => {
        course = JSON.parse(data)
        responseMessage = `@${context['display-name']}, ${course.message}`
        client.say(target, responseMessage)
            .then(message => console.log(`Sent message: ${message}`))
            .catch(console.error)
    })
}