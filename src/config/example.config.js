/**
 * @author Samarth Sharma <devinsane.79@gmail.com>
 */


/**
 * These are just the imports so you can ignore them !6_9!
 */
const { GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');

config();

module.exports.settings = {
      /**
       * Bot Config
       */
      bot: {
            /**
             * Discord bot ID
             */
            id: '',
            /**
             * Discord bot support server ID.
             */
            guildId: '',
            /**
             * @WARNING To prevent token leakage when using a public code editor like replit.com, make sure you use environment secrets to save credentials
             */
            token: '' || process.env.token,
            /**
             * Add your team members userID in this array.
             * 
             * @example ['123456789...', '234567891...', '345678912...']
             */
            team: [''],
            /**
             * Two environments are available, you can select one according to your preference.
             * 
             * Available Environments: <development, production>
             */
            environment: 'development',
            /**
             * This will be your invititaion url just change the {CLIENT_ID} --> YOUR DISCORD BOT ID.
             */
            inv_url: `https://discord.com/api/oauth2/authorize?client_id={CLIENT_ID}&permissions=8&scope=bot%20applications.commands`,
            /**
             * Make a permanent invite link of your bot support server & save it here for future uses.
             */
            support_server_url: 'https://discord.gg/{CODE}',
            /**
             * Client Options
             * 
             * @WARNING If you dont know what to do here, do not touch these settings else it may cause the bot crashing again & again.
             */
            opts: {
                  /*%
                   * Client Intents.
                   */
                  intents: [
                        GatewayIntentBits.Guilds,
                        GatewayIntentBits.GuildMembers,
                        GatewayIntentBits.GuildMessages,
                        GatewayIntentBits.GuildBans,
                        GatewayIntentBits.GuildInvites,
                        GatewayIntentBits.GuildPresences
                  ],
                  /**
                   * Client Mentions on replies.
                   */
                  allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true },
                  /**
                   * Shards
                   */
                  shards: 'auto',
                  /**
                   * You dont need to know this..
                   */
                  failIfNotExists: false
            },
            /**
             * Message Embed
             */
            embed: {
                  /**
                   * You dont need to know this..
                   */
                  timestamp: new Date(),
                  /**
                   * You dont need to know this..
                   */
                  color: { default: 0x5558ff, alert: 0xcc3300, warn: 0xffcc00 },
                  /**
                   * You dont need to know this..
                   */
                  title: 'Universal™'
            }
      }
};