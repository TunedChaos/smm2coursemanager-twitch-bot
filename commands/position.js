const path = require('path')
require('dotenv').config({path: path.resolve(__dirname + '../.env')})
const io = require('socket.io-client')
var socket = io.connect(process.env.SERVER_ADDRESS)
var commandPrefix = process.env.COMMAND_PREFIX

function getPosition(personName, courseCode) {
    return new Promise(resolve => {
        socket.emit('course_position', `${commandPrefix}position` , personName, courseCode)
        socket.on('position_course', response => {
            resolve(response)
        })
    })
}

module.exports = (client, target, context, msg) => {
    var personName = context['display-name']
    var courseCode = msg.substr(msg.indexOf(`${commandPrefix}position`) + 10, 11)
    getPosition(personName,courseCode)
    .then(response => {
        jsonResponse = JSON.parse(response)
        responseMessage = `@${context['display-name']}, ${jsonResponse.message}`
        client.say(target, responseMessage)
            .then(message => console.log(`Sent message: ${message}`))
            .catch(console.error)
    })
}