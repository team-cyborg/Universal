/* eslint-disable class-methods-use-this */
const Express = require('express');
const gradient = require('gradient-string');
const { Client, Collection, REST, Routes } = require('discord.js');
const { config } = require('dotenv');
const { readdirSync, createWriteStream, readFileSync, createReadStream } = require('fs');
const path = require('path');
const { Logger } = require('./Logger');
const { Util } = require('./Utilities');
const { settings } = require('../config/config');
const { Database } = require('./Database');
const { createInterface } = require('readline');

config();

class UniClient extends Client {
      constructor(options) {
            super(options);

            this.commands = new Collection();
            this.commandsArray = [];
            this.outFile = createWriteStream(path.join(__dirname, '../logs/stdout.log'));
            this.errOutFile = createWriteStream(path.join(__dirname, '../logs/stderr.log'));
            this.loggger = new Logger({ out: this.outFile, errout: this.errOutFile });
            this.settings = settings;
            this.app = Express();
            this.rest = new REST({ version: '10' }).setToken(this.settings.bot.token);
            this.utilities = new Util();
            this.guild_database = new Database(path.join(__dirname, '..', 'database', 'guilds', 'guilds.json'));
      }

      async menu() {
            const menu = createInterface({
                  input: createReadStream('./src/assets/menu.txt'),
                  crlfDelay: Infinity
            })

            for await (const line of menu) {
                  console.log(gradient.cristal(line));
            }
      }

      handleCommands(commandPath) {
            const dir = readdirSync(commandPath).filter((files) => files.endsWith('.js'));

            for (const file of dir) {
                  // eslint-disable-next-line import/no-dynamic-require, global-require
                  const command = require(`${commandPath}/${file}`);

                  if (!command.data || !command.run) return this.log(`Command Failed: ${file.split('.')[0].toUpperCase()}`);
                  this.commands.set(command.data.name, command);
                  this.commandsArray.push(command.data);
                  this.loggger.info(`Command Loaded: ${file.split('.')[0].toUpperCase()}`);
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
                  this.loggger.info(`Event Success: ${file.split('.')[0].toUpperCase()}`);
            }
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
                  ).then((data) => this.loggger.info(`${data.length} (/) commands registered globally.`)).catch(console.error);
            } else {
                  this.rest.put(
                        Routes.applicationGuildCommands(this.settings.bot.id, this.settings.bot.guildId),
                        { body: this.commandsArray }
                  // eslint-disable-next-line no-console
                  ).then((data) => this.loggger.info(`${data.length} (/) commands registered locally.`)).catch(console.error);
            }
      }

      server() {
            const PORT = 5000;

            this.app.get('/', (req, res) => {
                  res.send('Hail the World!');
            });

            this.app.listen(PORT, () => {
                  this.loggger.info(`Server started on: ${PORT}`);
            });

      }
}

module.exports.UniClient = UniClient;