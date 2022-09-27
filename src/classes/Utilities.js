/* eslint-disable */

const { EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

class Util {
      
      createBasicEmbed({ title, desc, url, color, thumbnail, timestamp })
      {
            if (!title) throw new Error('Title not provided');
            if (!desc) throw new Error('Description not provided');

            const embed = new EmbedBuilder()
                  .setTitle(title)
                  .setDescription(desc)
                  .setColor(color || 0x5558ff)
                  .setURL(url || null)
                  .setThumbnail(thumbnail || null)
                  .setTimestamp();
            
            return embed;
            // return JSON.stringify(embed);
      }

      async sleep(time) {
            await wait(time);
      }

};

module.exports.Util = Util;