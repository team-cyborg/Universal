/* eslint-disable no-console */

const { codeBlock, quote, blockQuote, hideLinkEmbed, userMention, escapeMarkdown } = require('discord.js');

console.log(codeBlock('js', 'This'));
console.log(quote('A quote'));
console.log(blockQuote('A blockquote'));
console.log(hideLinkEmbed('A link'));
console.log(userMention('ID'));
console.log(escapeMarkdown('hmm', ));
