import { App } from "@slack/bolt";
import { config } from "dotenv";

config();
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

/**
 * '/bolt' command will summon the Bolt Butler!
 */
app.command('/bolt', async ({ command, ack, say }) => {
  await ack();
  await say(`Mmm, yeesssss? :man-tipping-hand:`);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt Butler app is running! ⚡️');
})();
