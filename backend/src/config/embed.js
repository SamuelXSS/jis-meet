require('dotenv').config()
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(process.env.WEBHOOK_URL);

module.exports = {
    Embed(embed) {
        const message = new MessageBuilder()
        .setTitle(embed.title)
        .setAuthor(embed.author.name, embed.author.avatar, embed.author.url)
        .setURL(embed.url)
        .setColor(embed.color)
        .setThumbnail(embed.thumbnail)
        .setDescription(embed.description)
        .setImage(embed.image)
        .setFooter(embed.footer.title, embed.footer.thumbnail)
        .setTimestamp();
        hook.send(message);
    }
}