module.exports = {
	data: {
		name: 'ping',
		description: 'A ping pong command.',
	},

	/**
	 *
	 * @param {import('../classes/Client').UniClient} universal
	 * @param {import('discord.js').CommandInteraction} interaction
	 */
	run: async (universal, interaction) => {
		await interaction.reply({
			embeds: [
				universal.utilities.createBasicEmbed({
					title: universal.settings.bot.embed.title,
					desc: `> My ping is: ${universal.ws.ping}ms!`,
					url: universal.settings.bot.inv_url,
					color: universal.settings.bot.embed.color.default,
					thumbnail: universal.user.displayAvatarURL(),
				}),
			],
		});
	},
};
