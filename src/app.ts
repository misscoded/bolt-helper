import { App } from "@slack/bolt";
import { config } from "dotenv";

config();

const {
  SLACK_BOT_TOKEN,
  SLACK_SIGNING_SECRET,
} = process.env;

const FEEDBACK_CHANNEL_NAME = '#feedback-bolt';
const ISSUE_CHANNEL_NAME = '#triage-sdk';
const QUESTION_CHANNEL_NAME = '#triage-sdk';

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
});

const modalViews = {
  home: {
    type: "modal",
    callback_id: "bolt_helper_view",
    title: {
      type: "plain_text",
      text: "Bolt Helper"
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Bolt is a framework available in <https://slack.dev/bolt/tutorial/getting-started|JavaScript>, <https://slack.dev/bolt-python/tutorial/getting-started|Python>, and <https://slack.dev/java-slack-sdk/guides/getting-started-with-bolt|Java> that speeds up and simplifies Slack app development by wrapping the different platform features and API behind a common interface. \n\n
          `,
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Tutorials",
              emoji: true
            },
            value: "tutorials",
            action_id: "tutorials"
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "FAQ",
              emoji: true
            },
            value: "faq",
            action_id: "faq"
          },
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ` `
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "Quick Actions"
          }
        ]
      },
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":question: Have a question we can answer?"
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Ask a Question"
          },
          action_id: "ask_question"
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":woman_climbing: How has your experience been with Bolt?"
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Submit Feedback"
          },
          action_id: "submit_feedback"
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":bug: Found a bug? Let us know!"
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Report an Issue"
          },
          action_id: "report_issue"
        }
      }
    ],
  },
  issue: {
    type: "modal",
    callback_id: "bolt_issue_submitted",
    title: {
      type: "plain_text",
      text: "Report an issue"
    },
    blocks: [
      {
        type: "input",
        block_id: "bolt_language",
        element: {
          type: "static_select",
          action_id: "bolt_language",
          placeholder: {
            type: "plain_text",
            text: "Select Bolt language",
            emoji: true
          },
          initial_option: {
            text: {
              type: "plain_text",
              text: "JavaScript",
              emoji: true
            },
            value: "JavaScript"
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "JavaScript",
                emoji: true
              },
              value: "JavaScript"
            },
            {
              text: {
                type: "plain_text",
                text: "Python",
                emoji: true
              },
              value: "Python"
            },
            {
              text: {
                type: "plain_text",
                text: "Java",
                emoji: true
              },
              value: "Java"
            }
          ],
        },
        label: {
          type: "plain_text",
          text: "Language",
          emoji: true
        },
      },
      {
        type: "input",
        block_id: "issue_severity",
        element: {
          type: "static_select",
          action_id: "issue_severity",
          placeholder: {
            type: "plain_text",
            text: "Select issue severity",
            emoji: true
          },
          initial_option: {
            text: {
              type: "plain_text",
              text: ":white_circle: Low Severity",
              emoji: true
            },
            value: ":white_circle:"
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: ":white_circle: Low Severity",
                emoji: true
              },
              value: ":white_circle:"
            },
            {
              text: {
                type: "plain_text",
                text: ":large_blue_circle: Medium Severity",
                emoji: true
              },
              value: ":large_blue_circle:"
            },
            {
              text: {
                type: "plain_text",
                text: ":red_circle: High Severity",
                emoji: true
              },
              value: ":red_circle:"
            }
          ],
        },
        label: {
          type: "plain_text",
          text: "Severity",
          emoji: true
        }
      },
      {
        type: "input",
        block_id: "issue_description",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "issue_description",
          placeholder: {
            type: "plain_text",
            text: "Describe the issue here. The more detail and context, the better!"
          },
        },
        label: {
          type: "plain_text",
          text: "Issue Description",
          emoji: true
        },
        hint: {
          type: "plain_text",
          text: "Your issue submission will be posted to the Bolt team in #triage-sdk"
        },
      }
    ],
    submit: {
      type: "plain_text",
      text: "Submit"
    }
  },
  feedback: {
    type: "modal",
    callback_id: "feedback_submitted",
    title: {
      type: "plain_text",
      text: "Submit feedback"
    },
    blocks: [
      {
        type: "input",
        block_id: "bolt_language",
        element: {
          type: "static_select",
          action_id: "bolt_language",
          placeholder: {
            type: "plain_text",
            text: "Select Bolt language",
            emoji: true
          },
          initial_option: {
            text: {
              type: "plain_text",
              text: "JavaScript",
              emoji: true
            },
            value: "JavaScript"
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "JavaScript",
                emoji: true
              },
              value: "JavaScript"
            },
            {
              text: {
                type: "plain_text",
                text: "Python",
                emoji: true
              },
              value: "Python"
            },
            {
              text: {
                type: "plain_text",
                text: "Java",
                emoji: true
              },
              value: "Java"
            }
          ],
        },
        label: {
          type: "plain_text",
          text: "Language",
          emoji: true
        },
      },
      {
        type: "input",
        block_id: "feedback_body",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "feedback_body",
          placeholder: {
            type: "plain_text",
            text: "Write your feedback here. The more detail and context, the better!"
          },
        },
        label: {
          type: "plain_text",
          text: "Feedback",
          emoji: true
        },
        hint: {
          type: "plain_text",
          text: "Your feedback will be posted to the Bolt team in #feedback-bolt"
        },
      }
    ],
    submit: {
      type: "plain_text",
      text: "Submit"
    }
  },
  question: {
    type: "modal",
    callback_id: "question_submitted",
    title: {
      type: "plain_text",
      text: "Ask a question"
    },
    blocks: [
      {
        type: "input",
        block_id: "bolt_language",
        element: {
          type: "static_select",
          action_id: "bolt_language",
          placeholder: {
            type: "plain_text",
            text: "Select Bolt language",
            emoji: true
          },
          initial_option: {
            text: {
              type: "plain_text",
              text: "JavaScript",
              emoji: true
            },
            value: "JavaScript"
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "JavaScript",
                emoji: true
              },
              value: "JavaScript"
            },
            {
              text: {
                type: "plain_text",
                text: "Python",
                emoji: true
              },
              value: "Python"
            },
            {
              text: {
                type: "plain_text",
                text: "Java",
                emoji: true
              },
              value: "Java"
            }
          ],
        },
        label: {
          type: "plain_text",
          text: "Language",
          emoji: true
        },
      },
      {
        type: "input",
        block_id: "question_urgency",
        element: {
          type: "static_select",
          action_id: "question_urgency",
          placeholder: {
            type: "plain_text",
            text: "Select question urgency",
            emoji: true
          },
          initial_option: {
            text: {
              type: "plain_text",
              text: ":white_circle: Low Urgency",
              emoji: true
            },
            value: ":white_circle:"
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: ":white_circle: Low Urgency",
                emoji: true
              },
              value: ":white_circle:"
            },
            {
              text: {
                type: "plain_text",
                text: ":large_blue_circle: Medium Urgency",
                emoji: true
              },
              value: ":large_blue_circle:"
            },
            {
              text: {
                type: "plain_text",
                text: ":red_circle: High Urgency",
                emoji: true
              },
              value: ":red_circle:"
            }
          ],
        },
        label: {
          type: "plain_text",
          text: "Urgency",
          emoji: true
        },
      },
      {
        type: "input",
        block_id: "question_body",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "question_body",
          placeholder: {
            type: "plain_text",
            text: "Write your question here. The more detail and context, the better!"
          },
        },
        label: {
          type: "plain_text",
          text: "How can we help?",
          emoji: true
        },
        hint: {
          type: "plain_text",
          text: "Your question will be posted to the Bolt team in #triage-sdk"
        },
      },
    ],
    submit: {
      type: "plain_text",
      text: "Submit"
    }
  },
};

/* '/bolt' command will trigger Bolt Helper */
app.command("/bolt", async ({ client, command, ack, say }) => {
  await ack();

  const args = command.text.split(' ');

  switch (args[0]) {
    case "issue":
      await openView(client, command, modalViews["issue"]);
      break;
    case "feedback":
      await openView(client, command, modalViews["feedback"]);
      break;
    case "question":
      await openView(client, command, modalViews["question"]);
      break;
    default:
      await openView(client, command, modalViews["home"]);
  }

});

/* Helper Modal Actions :: Home */
app.action("faq", async ({ ack, body, client }) => {
  await ack();

  try {
    await client.views.update({
      // @ts-ignore
      // TODO :: it's not having any of this
      view_id: body.view.id,
      // @ts-ignore
      // TODO :: it's not having any of this
      hash: body.hash,
      // View payload with updated blocks
      view: {
        type: "modal",
        callback_id: "bolt_faq_view",
        title: {
          type: "plain_text",
          text: "FAQ"
        },
        blocks: [
          /* AVAILABLE LISTENERS? */
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*What are the different available listeners and arguments for listeners?*\nFor JavaScript and Python we detail all of the information about listeners and their arguments in the READMEs: <https://github.com/slackapi/bolt-js#listening-for-events|Bolt for JavaScript> and <https://github.com/slackapi/bolt-python#listening-for-events|Bolt for Python>.`
            }
          },
          /* CUSTOMIZATION / LOWER-LEVEL? */
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*What if I need something more customizable and lower-level?*\nYou can check out all of our developer tools on <https://slack.dev|https://slack.dev>. Bolt uses lower-level SDKs behind the scenes that you could use in your own project.`
            }
          },
          /* WHO MAINTAINS BOLT? */
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Who maintains Bolt?*\nThe Bolt frameworks are written and maintained with :heart: by the Tools Team (<https://slack-pde.slack.com/archives/C8ECW04BC|#team-devrel-tools>).`
            }
          },
          /* CONTRIBUTING */
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Can I contribute to Bolt?*\nYes! Read our contributor guides for <https://github.com/slackapi/bolt-js/blob/main/.github/contributing.md|JavaScript>, <https://github.com/slackapi/bolt-python/blob/main/.github/contributing.md|Python>, and <https://github.com/slackapi/java-slack-sdk/blob/main/.github/contributing.md|Java>.`
            }
          },
        ],
        submit: {
          type: "plain_text",
          text: "Back"
        }
      }
    });
  }
  catch (error) {
    console.error(error);
  }
});

app.action("tutorials", async ({ ack, body, client }) => {
  await ack();

  try {
    await client.views.update({
      // @ts-ignore
      // TODO :: it's not having any of this
      view_id: body.view.id,
      // @ts-ignore
      // TODO :: it's not having any of this
      hash: body.hash,
      // View payload with updated blocks
      view: {
        type: "modal",
        callback_id: "bolt_helper_tutorials_view",
        title: {
          type: "plain_text",
          text: "Tutorials"
        },
        blocks: [
          /* GETTING STARTED & DOCUMENTATION */
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "*Getting Started Guides & Documentation*"
              },
            ],
          },
          {
            type: "divider"
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `:bolt-js: <https://slack.dev/bolt-js/tutorial/getting-started|Getting started with Bolt for JavaScript> \n :bolt-py: <https://slack.dev/bolt-python/tutorial/getting-started|Getting started with Bolt for Python> \n :bolt-java: <https://slack.dev/bolt-java/tutorial/getting-started|Getting started with Bolt for Java>\n\n`
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: ` `
            },
          },
          /* TUTORIALS & WEBINARS */
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "*Tutorials and Webinars*"
              },
            ],
          },
          {
            type: "divider"
          },
          {
            type: "section",
            text: {
              type: 'mrkdwn',
              text: `:tv: Building Apps with :bolt-js: <https://www.youtube.com/watch?v=wEJQQA_oYeI&feature=youtu.be|Bolt for JavaScript>, :bolt-py: <https://slack.com/events/webinars/building-on-the-slack-platform-with-python|Bolt for Python>, and :bolt-java: <https://slack.com/events/webinars/building-on-the-slack-platform-with-java|Bolt for Java>\n :bolt-js: <https://api.slack.com/tutorials/workflow-builder-steps|Workflow Steps from Apps> \n :bolt-js: <https://slack.dev/bolt-js/deployments/heroku|Deploying Bolt for JavaScript Apps to Heroku>\n\n`
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: ` `
            },
          },
          /* BOLT CODE SAMPLES */
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "*Bolt Code Samples*"
              },
            ],
          },
          {
            type: "divider"
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `:bolt-py: <https://github.com/slackapi/bolt-python/tree/main/examples|Bolt for Python samples> (includes many Python frameworks) \n :bolt-js: <https://github.com/slackapi/sample-incident-management|Bolt for JavaScript Incident Management Sample App> \n :bolt-java: <https://github.com/slackapi/java-slack-sdk|Bolt for Java Samples> (folders pre-fixed with \`bolt-\`) \n :glitch_fish: <https://glitch.com/@slack|Bolt for JavaScript Samples on Glitch> \n :bolt: <https://api.slack.com/tools/bolt|Basic Samples for a Variety of Platform Features>`
            }
          },
        ],
        submit: {
          type: "plain_text",
          text: "Back"
        }
      }
    });
  }
  catch (error) {
    console.error(error);
  }
});

app.action("ask_question", async ({ ack, body, client }) => {
  await ack();

  try {
    await client.views.update({
      // @ts-ignore
      // TODO :: it's not having any of this
      view_id: body.view.id,
      // @ts-ignore
      // TODO :: it's not having any of this
      hash: body.hash,
      // View payload with updated blocks
      // @ts-ignore
      // TODO :: it's not having any of this
      view: modalViews["question"]
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("report_issue", async ({ ack, body, client }) => {
  await ack();

  try {
    const result = await client.views.update({
      // @ts-ignore
      // TODO :: it's not having any of this
      view_id: body.view.id,
      // @ts-ignore
      // TODO :: it's not having any of this
      hash: body.hash,
      // @ts-ignore
      // TODO :: it's not having any of this
      view: modalViews['issue']
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

app.action("submit_feedback", async ({ ack, body, client }) => {
  await ack();

  try {
    const result = await client.views.update({
      // @ts-ignore
      // TODO :: it's not having any of this
      view_id: body.view.id,
      // @ts-ignore
      // TODO :: it's not having any of this
      hash: body.hash,
      // @ts-ignore
      // TODO :: it's not having any of this
      view: modalViews["feedback"]
    });
  }
  catch (error) {
    console.error(error);
  }
})


/* Helper Modal Back Buttons -> Return to Helper Home */
app.view("bolt_faq_view", async ({ ack, client, body }) => {
  await ack();
  try {
    await client.views.open({
      // @ts-ignore
      trigger_id: body.trigger_id,
      // @ts-ignore
      view: modalViews["home"]
    });
  }
  catch (error) {
    console.error(error);
  }
});

app.view("bolt_helper_tutorials_view", async ({ ack, client, body }) => {
  await ack();
  try {
    await client.views.open({
      // @ts-ignore
      trigger_id: body.trigger_id,
      // @ts-ignore
      view: modalViews["home"]
    });
  }
  catch (error) {
    console.error(error);
  }
});

/* Modal Form Submissions */
app.view("question_submitted", async ({ ack, client, view, body }) => {
  await ack();

  const [bolt_language, question_urgency, question_body] = Object.values(view.state.values);
  const { user } = body;

  const language = bolt_language.bolt_language.selected_option.value;
  const urgencyEmoji = question_urgency.question_urgency.selected_option.value;
  const question = question_body.question_body.value;

  client.chat.postMessage({
    channel: QUESTION_CHANNEL_NAME,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${urgencyEmoji} <@${user.id}> submitted the following question:\n\n*Language:*\n ${language}\n\n> ${question}`
        }
      },
    ],
    text: `${urgencyEmoji} <@${user.id}> submitted the following question about Bolt for ${language}: ${question}`,
  });
});

app.view("feedback_submitted", async ({ ack, client, view, body }) => {
  await ack();

  const [bolt_language, feedback_body] = Object.values(view.state.values);
  const { user } = body;

  const language = bolt_language.bolt_language.selected_option.value;
  const feedback = feedback_body.feedback_body.value;

  client.chat.postMessage({
    channel: FEEDBACK_CHANNEL_NAME,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<@${user.id}> submitted the following feedback:\n\n*Language:*\n ${language}\n\n> ${feedback}`
        }
      },
    ],
    text: `<@${user.id}> submitted the following feedback about Bolt for ${language}: ${feedback}`,
  });
});

app.view("bolt_issue_submitted", async ({ ack, client, view, body }) => {
  await ack();

  const [bolt_language, issue_severity, issue_description] = Object.values(view.state.values);
  const { user } = body;

  const language = bolt_language.bolt_language.selected_option.value;
  const severityEmoji = issue_severity.issue_severity.selected_option.value;
  const issueDescription = issue_description.issue_description.value;

  client.chat.postMessage({
    channel: ISSUE_CHANNEL_NAME,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${severityEmoji} <@${user.id}> submitted the following issue:\n\n*Language:*\n ${language}\n\n> ${issueDescription}`
        }
      },
    ],
    text: `${severityEmoji} <@${user.id}> submitted the following issue about Bolt for ${language}: ${issueDescription}`,
  });
});

/* Shortcuts */
app.shortcut("report_issue", async ({ client, shortcut, ack, say }) => {
  await ack();

  try {
    await openView(client, shortcut, modalViews["issue"]);
  } catch (error) {
    console.error(error);
  }
});

app.shortcut("submit_feedback", async ({ client, shortcut, ack, say }) => {
  await ack();

  try {
    await openView(client, shortcut, modalViews["feedback"]);
  } catch (error) {
    console.error(error);
  }
});

app.shortcut("ask_question", async ({ client, shortcut, ack, say }) => {
  await ack();

  try {
    await openView(client, shortcut, modalViews["question"]);
  } catch (error) {
    console.error(error);
  }
});

// @ts-ignore
async function openView(client, event, view) {
  try {
    await client.views.open({
      trigger_id: event.trigger_id,
      view
    });
  }
  catch (error) {
    console.error(error);
  }
}

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt Helper is running! ⚡️");
})();
