/* eslint-disable class-methods-use-this */
const Express = require('express');
const { Client, Collection, REST, Routes } = require('discord.js');
const { config } = require('dotenv');
const { join } = require('path');
const { readdirSync } = require('fs');
const path = require('path');
const { Logger } = require('./Logger');
const { Util } = require('./Utilities');
const { settings } = require('../config/config');
const { Database } = require('./Database');

config();

class UniClient extends Client {
      constructor(options) {
            super(options);

            this.commands = new Collection();
            this.commandsArray = [];
            this.loggger = new Logger(join(__dirname, '..', 'logs', 'debug.log'));
            this.settings = settings;
            this.app = Express();
            this.rest = new REST({ version: '10' }).setToken(this.settings.bot.token);
            this.utilities = new Util();
            this.guild_database = new Database(path.join(__dirname, '..', 'database', 'guilds', 'guilds.json'));
            // this.blacklisted_users_database = new Database(path.join(__dirname, '..', 'database', 'users', 'blacklisted', 'blacklisted.json'));
            // this.whitelisted_users_database = new Database(path.join(__dirname, '..', 'database', 'users', 'whitelisted', 'whitelisted.json'));
            
            this.handleCommands(join(__dirname, '..', 'commands'));
            this.handleEvents(join(__dirname, '..', 'events'));
            this.server();
      }

      handleCommands(commandPath) {
            const dir = readdirSync(commandPath).filter((files) => files.endsWith('.js'));

            for (const file of dir) {
                  // eslint-disable-next-line import/no-dynamic-require, global-require
                  const command = require(`${commandPath}/${file}`);

                  if (!command.data || !command.run) return this.log(`Command Failed: ${file.split('.')[0].toUpperCase()}`);
                  this.commands.set(command.data.name, command);
                  this.commandsArray.push(command.data);
                  this.log(`Command Loaded: ${file.split('.')[0].toUpperCase()}`);
            }
      }

      handleEvents(eventPath) {
            const dir = readdirSync(eventPath).filter((files) => files.endsWith('.js'));

            for (const file of dir) {
                  // eslint-disable-next-line import/no-dynamic-require, global-require
                  const event = require(`${eventPath}/${file}`);

                  if (!event.data || !event.run) return this.log(`Event Failed: ${file.split('.')[0].toUpperCase()}`);
                  if (event.data.once) this.once(event.data.name, (...args) => event.run(this, ...args));
                  else this.on(event.data.name, (...args) => event.run(this, ...args));
                  this.log(`Event Success: ${file.split('.')[0].toUpperCase()}`);
            }
      }

      log(info) {
            this.loggger.log(info);
      }

      start() {
            this.login(this.settings.bot.token);
      }

      deploySlashCommands(global) {
            if (global === true) {
                  this.rest.put(
                        Routes.applicationCommands(this.settings.bot.id),
                        { body: this.commandsArray }
                  // eslint-disable-next-line no-console
                  ).then((data) => this.log(`${data.length} (/) commands registered globally.`)).catch(console.error);
            } else {
                  this.rest.put(
                        Routes.applicationGuildCommands(this.settings.bot.id, this.settings.bot.guildId),
                        { body: this.commandsArray }
                  // eslint-disable-next-line no-console
                  ).then((data) => this.log(`${data.length} (/) commands registered locally.`)).catch(console.error);
            }
      }

      server() {
            const PORT = 5000;

            this.app.get('/', (req, res) => {
                  res.send('Hail the World!');
            });

            this.app.listen(PORT, () => {
                  this.log(`Server started on: ${PORT}`);
            });

      }
}

module.exports.UniClient = UniClient;