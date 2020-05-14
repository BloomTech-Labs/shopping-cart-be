const Sellers = require('../../models/seller')
const bcrypt = require('bcryptjs')
const generateToken = require('../../helpers/generateToken')
const { validateRegisterInput } = require('../../middleware/validateSellerData')

function register (req, res) {
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { name, phone, password } = req.body

  // Check if User already exists
  Sellers.findOne({ phone }).then((user) => {
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const newUser = new Sellers({ name, phone, password })

    // Hash User Password
    const hash = bcrypt.hashSync(password, 10)
    newUser.password = hash
    newUser
      .save()
      .then((user) => {
        // Generate Token and sends it back with user data
        const token = generateToken(user)
        return res.status(201).json({
          user: {
            id: user.id,
            name: user.name,
            phone: user.phone
          },
          token
        })
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message })
      })
  })
}

module.exports = register
