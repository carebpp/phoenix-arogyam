exports.handler = async (event) => {
  if (event.httpMethod!== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { name, email, message } = JSON.parse(event.body)

    // carebpp@gmail.com
    // up11A1322#

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Thanks ${name}! We received your message.` })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error: ' + error.message })
    }
  }
}
