const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NjY1NzA2NTE4OTUxMzYyNTg2.Xhphjg.LQgy0p_w-aGY1GmyhiaTg4sVYHo';
const ms = require('ms');
const PREFIX = '!';
var version = "1.0.0";
var soon = "In about some days!";

client.on('ready', () => {
     console.log('Jupytir bot is online!');
});

client.on('message', message => {
     if (!message.content.startsWith(PREFIX)) return;
     let args = message.content.substring(PREFIX.length).split(" ");

     switch (args[0]) {
          case 'ping':
               message.channel.sendMessage('Pong!');
               break;
          case 'download':
               message.channel.sendMessage('Insert download link here');
               break;
          case 'author':
               message.channel.sendMessage('I am made by urmother#6432');
               break;
          case 'whoami':
               const embed = new Discord.RichEmbed()
                    .setTitle('User Information')
                    .addField('Player Name', message.author.username)
                    .addField('Version', version)
                    .addField('Server name: ', message.guild.name)
                    .setThumbnail(message.author.avatarURL)
               message.channel.sendEmbed(embed)
               break;
          case 'help':
               const embed1 = new Discord.RichEmbed()
                    .setTitle('Help')
                    .addField('Coming soon!', soon)
                    .addField('Version', version)
                    .addField('Server name: ', message.guild.name)
               message.channel.sendEmbed(embed1)
               break;
          case 'mute':
               if (!message.member.roles.find(r => r.name === "Owners")) return message.channel.send("You don't have permissions to do this!")
               var person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
               if (!person) return message.reply("Couldn't find the user " + person)

               let mainrole = message.guild.roles.find(role => role.name === "Exploiters");
               let role = message.guild.roles.find(role => role.name === "Mute");


               if (!role) return message.reply("Couldn't find the mute role.")


               let time = args[2];
               if (!time) {
                    return message.reply("You didnt specify a time!");
               }

               person.removeRole(mainrole.id);
               person.addRole(role.id);


               message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)

               setTimeout(function () {

                    person.addRole(mainrole.id)
                    person.removeRole(role.id);
                    console.log(role.id)
                    message.channel.send(`@${person.user.tag} has been unmuted.`)
               }, ms(time));



               break;
          case 'kick':
               if (!message.member.roles.find(r => r.name === "Owners")) return message.channel.send("You don't have permissions to do this!")

               const user = message.mentions.users.first();

               if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                         member.kick("You have been kicked from Jupytir Server!").then(() => {
                              message.reply('Sucessfully kicked the user!')

                         }).catch(err => {
                              message.reply("Unable to kick the user!")
                              message.log(err)
                         })

                    } else {
                         message.reply("Couldn't find the user!")
                    }
               } else {
                    message.reply("You need to specify a user!")
               }
               break;
          case 'ban':
               if (!message.member.roles.find(r => r.name === "Owners")) return message.channel.send("You don't have permissions to do this!")

               const user1 = message.mentions.users.first();

               if (user1) {
                    const member = message.guild.member(user1);
                    if (member) {
                         member.ban({ resson: "You have been banned!" }).then(() => {
                              message.reply("The player was banned!")
                         })
                    } else {
                         message.reply("Couldn't find the user!")
                    }
               } else {
                    message.reply("You need to specify a user!")
               }
               break;
     }
})

client.login(process.env.BOT_TOKEN);
