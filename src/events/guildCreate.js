const { ChannelType } = require('discord.js');

module.exports = {
      data: {
            name: 'guildCreate',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Guild} guild
       */
      run: async (universal, guild) => {
            const fetchedChannels = guild.channels.cache.filter(chnn => chnn.type === ChannelType.GuildText);
            const firstChannel = fetchedChannels.find(c => c.position === 0);
            const getGuildDb = universal.guild_database.get(guild.id);

            universal.log(`Bot joined a guild: ${guild.name} (${guild.id})`);

            if (!getGuildDb) {
                  await universal.guild_database.set(guild.id,
                        {
                              guildId: guild.id,
                              ownerId: guild.ownerId,
                              whitelisted_users: [],
                              blacklisted_users: []
                        });
                  
                  universal.log(`Database for ${guild.name} (${guild.id}) created.`);
            }

            await firstChannel.send({
                  embeds: [
                        {
                              title: universal.settings.bot.embed.title,
                              description: [
                                    '> Greetings, I am universal, a discord antinuke bot dedicated to preventing guild nukes.',
                                    '> Some usefull commands: ` /setup `, ` /help `, ` /guide `',
                              ].join('\n'),
                              color: universal.settings.bot.embed.color.default,
                              thumbnail: {
                                    url: universal.user.displayAvatarURL()
                              },
                              timestamp: universal.settings.bot.embed.timestamp
                        }
                  ]
            });
      }
};