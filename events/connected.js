
module.exports = (client, addr, port) => {
    console.log(`Connected as ${client.opts.identity.username} to ${addr}:${port}`)
}