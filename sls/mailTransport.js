require('dotenv').config()
const nodemailer = require('nodemailer')

const makeMessage = obj => {
  const keys = Object.keys(obj)
  return keys
    .reduce(
      (acc, key) => acc.concat(`<p>${key}: <strong>${obj[key]}</strong></p>`),
      []
    )
    .concat(`<p>см: https://docs.google.com/spreadsheets/d/${process.env.SHEET_ID}/edit?usp=sharing</p>`)
    .join('')
}

const sendMail = (options, callback) => {
  const transporter = nodemailer.createTransport(
    {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.LOGIN,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      logger: false,
      debug: false,
    },
    {
      from: process.env.EMAIL_FROM,
    }
  )

  const message = {
    to: process.env.EMAIL_TO,
    subject: 'История с сайта elabuga.orchestra-design.com',
    text: 'Добавлена история!',
    html: makeMessage(options),
  }

  transporter.sendMail(message, (error, info) => {
    const res = []
    if (error) {
      res.push(`Ошибка: ${error.message}`)
      return process.exit(1)
    }
    res.push('Спасибо! Ваша история принята!')
    res.push(info)
    return callback(res)
  })
}

module.exports = sendMail
