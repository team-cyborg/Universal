/* eslint-disable no-console */
const { EmbedBuilder } = require('discord.js');

const createEmbed = ({ title, desc, url, color, thumbnail, timestamp }) => {
      const emb = new EmbedBuilder()
            .setTitle(title)
            .setDescription(desc)
            .setColor(color || 0x5558ff)
            .setTimestamp(timestamp || null || undefined)
            .setURL(url || null)
            .setThumbnail(thumbnail || null);
      
      return JSON.stringify(emb);
};