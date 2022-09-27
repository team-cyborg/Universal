const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'webhookCreate',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').GuildChannel} webhook 
       */
      run: async (universal, webhook) => {
            const hookCreateAudit = await webhook.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.WebhookCreate });
            const hookDeleteAudit = await webhook.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.WebhookDelete });
            const hookUpdateAudit = await webhook.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.WebhookUpdate });

            const hookCreateLogs = hookCreateAudit.entries.first();
            const hookDeleteLogs = hookDeleteAudit.entries.first();
            const hookUpdateLogs = hookUpdateAudit.entries.first();

            if (hookCreateLogs.executor.id !== webhook.guild.ownerId && hookCreateLogs.executor.id !== universal.user.id) {
                  webhook.guild.members.ban(hookCreateLogs.executor.id, { reason: 'Create/Update/Delete Webhook!' });
            }

            if (hookDeleteLogs.executor.id !== webhook.guild.ownerId && hookDeleteLogs.executor.id !== universal.user.id) {
                  webhook.guild.members.ban(hookDeleteLogs.executor.id, { reason: 'Create/Update/Delete Webhook!' });
            }

            if (hookUpdateLogs.executor.id !== webhook.guild.ownerId && hookUpdateLogs.executor.id !== universal.user.id) {
                  webhook.guild.members.ban(hookUpdateLogs.executor.id, { reason: 'Create/Update/Delete Webhook!' });
            }
      }
};