const add = require ('../commands/add')
const list = require ('../commands/list')
const next = require ('../commands/next')
const playing = require ('../commands/playing')
const position = require('../commands/position')
const queue = require('../commands/queue')
const status = require ('../commands/status')

module.exports = (client, target, context, msg, self) => {
    if(!self){
        var commandPrefix = process.env.COMMAND_PREFIX
        var messageContent = msg.toLowerCase()

        if (messageContent.startsWith(`${commandPrefix}add`))
        {
            return add(client, target, context, msg)
        }
        else if(messageContent.startsWith(`${commandPrefix}list`))
        {
            return list(client, target, context, msg)
        }
        else if(messageContent.startsWith(`${commandPrefix}next`))
        {
            return next(client, target, context, msg)
        }
        else if(messageContent.startsWith(`${commandPrefix}playing`))
        {
            return playing(client, target, context, msg)
        }
        else if(messageContent.startsWith(`${commandPrefix}position`))
        {
            return position(client, target, context, msg)
        }
        else if(messageContent.startsWith(`${commandPrefix}queue`))
        {
            return queue(client, target, context, msg)
        }
        else if(messageContent.startsWith(`${commandPrefix}status`))
        {
            return status(client, target, context, msg)
        }
    }

}