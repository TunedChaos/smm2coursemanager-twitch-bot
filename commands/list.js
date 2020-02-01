const path = require('path')
require('dotenv').config({path: path.resolve(__dirname + '../.env')})

module.exports = (client, target, context, msg) => {
    if(typeof process.env.LIST_ADDRESS != "undefined"){
        if(process.env.LIST_ADDRESS !== "")
        {
            client.say(target, `@${context['display-name']}, to view the current list of levels, and their statuses, please visit ${process.env.LIST_ADDRESS}`)
            .then(message => console.log(`Sent message: ${message}`))
            .catch(console.error)
        }else{
            client.say(target,`@${context['display-name']}, there is currently no list available.`)
            .then(message => console.log(`Sent message: ${message}`))
            .catch(console.error)
        }
    }else{
        client.say(target,`@${context['display-name']}, there is currently no list available.`)
            .then(message => console.log(`Sent message: ${message}`))
            .catch(console.error)
    }
}