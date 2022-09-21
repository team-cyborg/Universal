/* eslint-disable class-methods-use-this */
const { Client, Collection, REST, Routes } = require('discord.js');
const express = require('express');
const { config } = require('dotenv');
const { join } = require('path');
const { readdirSync } = require('fs');
const { Logger } = require('./Logger');
const { settings } = require('../config/config');

config();

class UniClient extends Client {
      constructor(options) {
            super(options);

            this.commands = new Collection();
            this.commandsArray = [];
            this.loggger = new Logger(join(__dirname, '..', 'logs', 'debug.log'));
            this.settings = settings;
            this.server = express();
            this.rest = new REST({ version: '10' }).setToken(this.settings.bot.token);

            this.handleCommands(join(__dirname, '..', 'commands'));
            this.handleEvents(join(__dirname, '..', 'events'));
      }

      handleCommands(commandPath) {
            const dir = readdirSync(commandPath).filter((files) => files.endsWith('.js'));

            for (const file of dir) {
                  // eslint-disable-next-line import/no-dynamic-require, global-require
                  const command = require(`${commandPath}/${file}`);

                  if (!command.data || !command.run) return this.log(`🔴 Command Load Failed: ${file.split('.')[0].toUpperCase()}`);
                  this.commands.set(command.data.name, command);
                  this.commandsArray.push(command.data);
                  this.log(`🟢 Command Load Success: ${file.split('.')[0].toUpperCase()}`);
            }
      }

      handleEvents(eventPath) {
            const dir = readdirSync(eventPath).filter((files) => files.endsWith('.js'));

            for (const file of dir) {
                  // eslint-disable-next-line import/no-dynamic-require, global-require
                  const event = require(`${eventPath}/${file}`);

                  if (!event.data || !event.run) return this.log(`🔴 Event Load Failed: ${file.split('.')[0].toUpperCase()}`);
                  if (event.data.once) this.once(event.data.name, (...args) => event.run(this, ...args));
                  else this.on(event.data.name, (...args) => event.run(this, ...args));
                  this.log(`🟢 Event Load Success: ${file.split('.')[0].toUpperCase()}`);
            }
      }

      log(info) {
            this.loggger.log(info)
      }

      start() {
            this.login(this.settings.bot.token);
      }

      deploySlashCommands(global) {
            if (global === true) {
                  this.rest.put(
                        Routes.applicationCommands(this.settings.bot.id),
                        { body: this.commandsArray }
                  ).then((data) => console.log(`${data.length} (/) commands registered globally.`)).catch(console.error);
            } else {
                  this.rest.put(
                        Routes.applicationGuildCommands(this.settings.bot.id, this.settings.bot.guildId),
                        { body: this.commandsArray }
                  ).then((data) => console.log(`${data.length} (/) commands registered locally.`)).catch(console.error)
            }
      }
}

module.exports.UniClient = UniClient;