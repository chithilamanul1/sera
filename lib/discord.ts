
/**
 * Sends a notification to a Discord Webhook
 * @param title The title of the embed (e.g. "New Lead!")
 * @param fields A list of fields to display (e.g. { name: "Email", value: "aaa@bbb.com" })
 * @param color optional hex color (default green)
 */
export async function sendDiscordNotification(
    title: string,
    description: string,
    fields: { name: string; value: string; inline?: boolean }[],
    color: number = 0x00ff00 // Green
) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        console.warn('⚠️ DISCORD_WEBHOOK_URL is not set. Skipping notification.');
        return;
    }

    try {
        const payload = {
            embeds: [
                {
                    title: title,
                    description: description,
                    color: color,
                    fields: fields,
                    footer: {
                        text: 'Seranex Lead System',
                        icon_url: 'https://seranex.org/icon.png'
                    },
                    timestamp: new Date().toISOString()
                }
            ]
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('Failed to send Discord notification:', await response.text());
        }
    } catch (error) {
        console.error('Error sending Discord notification:', error);
    }
}
