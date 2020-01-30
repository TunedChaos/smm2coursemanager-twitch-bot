const path = require('path')
require('dotenv').config({path: path.resolve(__dirname + '../.env')})
const io = require('socket.io-client')
var socket = io.connect(process.env.SERVER_ADDRESS)
var commandPrefix = process.env.COMMAND_PREFIX

function getStatus(personName, courseCode) {
    return new Promise(resolve => {
        socket.emit('course_status', `${commandPrefix}status`, personName, courseCode)
        socket.on('status_course', response => {
            resolve(response)
        })
    })
}

module.exports = (client, target, context, msg) => {
    var personName = context['display-name']
    var courseCode = msg.substr(msg.indexOf(`${commandPrefix}status`) + 8, 11)
    getStatus(personName,courseCode)
    .then(response => {
        jsonResponse = JSON.parse(response)
        responseMessage = `@${context['display-name']}, ${jsonResponse.message}`
        client.say(target, responseMessage)
            .then(message => console.log(`Sent message: ${message}`))
            .catch(console.error)
    })

}