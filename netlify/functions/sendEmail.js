exports.handler = async (event) => {
  if (event.httpMethod!== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { name, email, message } = JSON.parse(event.body)

    // Yahan aapka email logic ayega
    // Example: Nodemailer ya SendGrid

    console.log('New Contact:', name, email, message)

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