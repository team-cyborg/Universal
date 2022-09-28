const { GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');

config();

module.exports.settings = {
      bot: {
            id: '957317091147538493',
            guildId: '912594669785972736',
            token: '' || process.env.token,
            team: ['953235785782534174'],
            dev_mode: true,
            inv_url: `https://discord.com/api/oauth2/authorize?client_id=957317091147538493&permissions=8&scope=bot%20applications.commands`,
            support_server_url: 'https://discord.gg/2V6TVaBPtu',
            opts: {
                  intents: [
                        GatewayIntentBits.Guilds,
                        GatewayIntentBits.GuildMembers,
                        GatewayIntentBits.GuildMessages,
                        GatewayIntentBits.GuildBans,
                        GatewayIntentBits.GuildInvites,
                        GatewayIntentBits.GuildPresences
                  ],
                  allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true },
                  shards: 'auto',
                  failIfNotExists: false
            },
            embed: {
                  timestamp: new Date(),
                  color: { default: 0x5558ff, alert: 0xcc3300, warn: 0xffcc00 },
                  title: 'Universal™'
            }
      }
};