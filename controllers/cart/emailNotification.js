var Mailgen = require('mailgen')

// Configure mailgen by setting a theme and your product info
var mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'Mailgen',
    link: 'https://mailgen.js/',
    // Optional product logo
    logo: 'https://mailgen.js/img/logo.png'
  }
})
// link to FE route of buyers saved cart
const link = 'https://shopping-cart-eu3.netlify.com/cart/:id'
// Prepare email contents
var email = {
  body: {
    name: 'John Appleseed',
    intro: 'Welcome to Mailgen! We’re very excited to have you on board.',
    action: {
      instructions: 'To get started with Mailgen, please click here:',
      button: {
        color: 'green',
        text: 'Confirm Your Account',
        link: link
      }
    },
    outro:
      "Need help, or have questions? Just reply to this email, we'd love to help."
  }
}

// Generate an HTML email using mailgen
var emailBody = mailGenerator.generate(email)

module.exports = emailBody
