const path = require('path')
require('dotenv').config({path: path.resolve(__dirname + '../.env')})
const io = require('socket.io-client')
var socket = io.connect(process.env.SERVER_ADDRESS)

function getNext(){
    return new Promise(resolve => {
        socket.emit('next_course')
        socket.on('course_next', response => {
            resolve(response)
        })
    })
}

module.exports = (client, target, context) => {
    getNext()
    .then(data => {
        course = JSON.parse(data)
        responseMessage = `@${context['display-name']}, ${course.message}`
        client.say(target, responseMessage)
            .then(message => console.log(`Sent message: ${message}`))
            .catch(console.error)
    })
}