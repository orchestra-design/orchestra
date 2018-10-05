'use strict'

const writeSheet = require('./googleSheet')
const s4 = require('./s4')

module.exports.contact = (event, context, callback) => {
  const newValues = [
    [
      s4(), 
      new Date().toLocaleString('ru-RU', { timeZone: 'UTC' })
    ].concat(
      event.queryStringParameters.answers.split(',')
    ),
  ]

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
    body: JSON.stringify({
      message: 'Write!',
      input: event,
    }),
  }
  
  writeSheet('Contacts!A:F', newValues)
  callback(null, response)
}
