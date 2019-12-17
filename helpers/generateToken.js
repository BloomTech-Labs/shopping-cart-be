const jwt = require('jsonwebtoken')
function generateToken (user) {
  const payload = {
    sub: user.id,
    username: user.phoneNumber
  }
  const options = {
    expiresIn: '1d'
  }

  const result = jwt.sign(payload, process.env.JWT_SECRET, options)

  return result
}

module.exports = generateToken
