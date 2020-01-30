const path = require('path')
require('dotenv').config({path: path.resolve(__dirname + '../.env')})
const io = require('socket.io-client')
var socket = io.connect(process.env.SERVER_ADDRESS)
var commandPrefix = process.env.COMMAND_PREFIX

function addCourse(requestPlatform, requestPlatformID, personName, courseCode) {
    return new Promise(resolve => {
        socket.emit('add_course', `${commandPrefix}add`, requestPlatform, requestPlatformID, personName, courseCode, process.env.AUTHCODE)
        socket.on('course_add', response => {
            resolve(response)
        })
    })
}

module.exports = (client, target, context, msg) => {
    var personName = context['display-name']
    var personID = context['user-id']
    var courseCode = msg.substr(msg.indexOf(`${commandPrefix}add`) + 5, 12)
    addCourse('Twitch',personID,personName,courseCode)
    .then(response => {
        jsonResponse = JSON.parse(response)
        responseMessage = `@${personName}, ${jsonResponse.message}`
        client.say(target, responseMessage)
        .then(result => {
            console.log(`Sent message ${result}`)
        })
        .catch(console.error)
    })
    .catch(err => {
        console.log(err)
    })
}