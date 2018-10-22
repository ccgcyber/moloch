'use strict';

const Notifme = require('notifme-sdk');

exports.init = function (api) {
  api.register('slack', {
    fields: [{
      name: 'slackWebhookUrl',
      required: true,
      type: 'secret',
      description: 'Incoming Webhooks are a simple way to post messages from external sources into Slack.'
    }],
    sendAlert: exports.sendSlackAlert
  });

  api.register('twilio', {
    fields: [{
      name: 'accountSid',
      required: true,
      type: 'secret',
      description: 'Twilio account ID'
    }, {
      name: 'authToken',
      required: true,
      type: 'secret',
      description: 'Twilio authentication token'
    }, {
      name: 'toNumber',
      required: true,
      description: 'The number to send the alert to'
    }, {
      name: 'fromNumber',
      required: true,
      description: 'The number to send the alert from'
    }],
    sendAlert: exports.sendTwilioAlert
  });

  api.register('email', {
    fields: [{
      name: 'secure',
      type: 'checkbox',
      description: 'Send the email securely'
    }, {
      name: 'host',
      required: true,
      description: 'Email host'
    }, {
      name: 'port',
      required: true,
      description: 'Email port'
    }, {
      name: 'user',
      required: true,
      description: 'The username of the user sending the email'
    }, {
      name: 'password',
      required: true,
      type: 'secret',
      description: 'Password of the user sending the email'
    }, {
      name: 'from',
      required: true,
      description: 'Send the email from this address'
    }, {
      name: 'to',
      required: true,
      description: 'Send the email to this address'
    }, {
      name: 'subject',
      description: 'The subject of the email (defaults to "Parliament Alert")'
    }],
    sendAlert: exports.sendEmailAlert
  })
};

// Slack
exports.sendSlackAlert = function (config, message) {
  if (!config.slackWebhookUrl) {
    console.error('Please add a Slack webhook URL on the Settings page to enable Slack notifications');
    return;
  }

  const slackNotifier = new Notifme.default({
    channels: {
      slack: {
        providers: [{
          type: 'webhook',
          webhookUrl: config.slackWebhookUrl
        }]
      }
    }
  });

  slackNotifier.send({ slack: { text: message } });
};

// Twilio
exports.sendTwilioAlert = function (config, message) {
  if (!config.accountSid || !config.authToken || !config.toNumber || !config.fromNumber) {
    console.error('Please fill out the required fields for Twilio notifications on the Settings page.');
    return;
  }

  const twilioNotifier = new Notifme.default({
    channels: {
      sms: {
        providers: [{
          type: 'twilio',
          accountSid: config.accountSid,
          authToken: config.authToken
        }]
      }
    }
  });

  twilioNotifier.send({
    sms: {
      from: config.fromNumber,
      to: config.toNumber,
      text: message
    }
  });
};

// Email
exports.sendEmailAlert = function (config, message) {
  if (!config.host || !config.port || !config.user || !config.password || !config.to || !config.from) {
    console.error('Please fill out the required fields for Email notifications on the Settings page.');
    return;
  }

  if (!config.secure) {
    config.secure = false;
  }

  const emailNotifier = new Notifme.default({
    channels: {
      email: {
        providers: [{
          type: 'smtp',
          host: config.host,
          port: config.port,
          secure: config.secure,
          auth: {
            user: config.user,
            pass: config.password
          }
        }]
      }
    }
  });

  emailNotifier.send({
    email: {
      html: message,
      to: config.to,
      from: config.from,
      subject: config.subject || 'Parliament Alert'
    }
  });
};
