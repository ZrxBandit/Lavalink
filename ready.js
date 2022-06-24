const { MessageEmbed } = require("discord.js");
const config = require("../config.json")
module.exports = async (client) => {

 const channel = await client.channels.fetch(config.channel)
    const embed = new MessageEmbed()
    .setColor("WHITE")
    .setDescription("Please wait for a minute!\nStatus is being ready!")
    channel.bulkDelete(10);
    channel.send(embed).then((msg) => {
   setInterval(() =>{
     
            let all = []
            
            client.manager.nodes.forEach(node => {
              let info = []
              info.push(`✧ Status: ${node.connected ? "🟢" : "🔴"}`)
              info.push(`✧ Node: ${(node.options.identifier)}`)
              info.push(`✧ Player: ${node.stats.players}`)
              info.push(`✧ Playing Players: ${node.stats.playingPlayers}`)
              info.push(`✧ Uptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}`)
              info.push("\n✧ CPU")
              info.push(`✧ Cores: ${node.stats.cpu.cores}`)
              info.push(`✧ System Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%`)
              info.push(`✧ Lavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`)
              all.push(info.join('\n'))
            });
        const rembed = new MessageEmbed()
            .setAuthor('Zen Developments LavaLink No SSL', client.user.displayAvatarURL())
            .setDescription(`\`\`\`yml\n${all.join('\n\n-------------------------------------------------\n')}\n\n` + 
                    `+ Total Memory  :: ${Math.round(require('os').totalmem() / 1024 / 1024)} mb\n` +
                    `+ Free Memory   :: ${Math.round(require('os').freemem() / 1024 / 1024)} mb\n` +
                    `+ RSS           :: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} mb\n` +
                    `+ Heap Total    :: ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} mb\n` +
                    `+ Heap Used     :: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} mb\n` +
                    `+ External      :: ${Math.round(process.memoryUsage().external / 1024 / 1024)} mb\n` +
                    `+ Array Buffer  :: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} mb\n` +
                    `+ CPU Model     :: ${require('os').cpus()[0].model}\n` +
                    `+ Cores         :: ${require('os').cpus().length}\n` +
                    `+ Speed         :: ${require('os').cpus()[0].speed}Mhz\n` +
                    `+ Platform      :: ${process.platform}\n` +
                    `+ PID           :: ${process.pid}\n` +
                    `\n` + `\`\`\``)
            .addField("***Important***", "*You can see all of our Lavalink servers [here](https://discord.com/channels/948744977524097116/956046750970413056).*")
            .setColor("WHITE")
            .setFooter("Zen Developments Lavalink")
            .setImage("https://i.imgur.com/X6YL3ML.png")
        .setTimestamp(Date.now());
        msg.edit(rembed);
        }, 2000);})
  
    client.manager.init(client.user.id);
    console.log(`${client.user.username} Is Now Online!`);

  const activities = [
  `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} members`
];

let i = 0;
setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING'}), 15000);

} 