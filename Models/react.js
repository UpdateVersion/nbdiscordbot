module.exports = (client) => {
    client.on('message', async (message) => {
        if (message.channel.name.includes('💡│suggestions')) {
            await message.react("a:yes:854742442354933820");
            await message.react("a:no:854742455319396443");
        }
    });
}