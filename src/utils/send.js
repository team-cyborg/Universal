const { settings } = require('../config/config')

/**
 * 
 * @param {import('discord.js').Interaction} interaction 
 * @param {String[]} message 
 * @returns 
 */
module.exports.sendEmbed = (interaction, message) => {
      const embed = {
            title: settings.bot.embed.title,
            color: settings.bot.embed.color,
            description: message.slice(0, 1999),
            timestamp: settings.bot.embed.timestamp
      }

      return interaction.reply({ embeds: [embed] })
}

/**
 * 
 * @param {import('discord.js').Interaction} interaction 
 * @param {String[]} message 
 */
module.exports.sendMsg = (interaction, message) => interaction.reply({ content: message.slice(0, 1999) })