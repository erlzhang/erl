// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const formData = require('form-data');
const Mailgun = require('mailgun.js');
//const fetch = require('node-fetch')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const mailgun = new Mailgun(formData);

const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.email
    const { email } = JSON.parse(event.body)
    if (!email) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: '请填写正确的邮箱地址!', code: 0 })
      }
    }

    const mg = mailgun.client({username: 'api', key: process.env.NETLIFY_EMAILS_PROVIDER_API_KEY});

    const res = await mg.lists.members.createMember('erl@mail.erl.im', {
      address: email,
      subscribed: 'yes', // optional, modifiable on website
      upsert: 'yes', // optional, choose yes to insert if not exist, or update it exist
    });

    await fetch(
  `${process.env.URL}/.netlify/functions/emails/subscribed`,
  {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
    },
    method: "POST",
    body: JSON.stringify({
      from: "Erl <erl@mail.erl.im>",
      to: "zhangshiyu1992@hotmail.com",
      subject: "您有新的订阅信息",
      parameters: {
        email: email
      },
    }),
  }
);
    return {
      statusCode: 200
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
