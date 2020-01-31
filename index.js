const fs = require('fs')
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname+'/.env')})
const tmi = require('tmi.js')

fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split('.')[0]
        client.on(eventName, (...args) => eventHandler(client, ...args))
    })
})

const opts = {
    identity: {
        username: `${process.env.TWITCH_BOT_USERNAME}`,
        password: `${process.env.TWITCH_OAUTH_TOKEN}`,
    },
    channels: [
        process.env.TWITCH_CHANNEL_NAME
    ]
}

// Create client
const client = new tmi.client(opts)

client.connect()