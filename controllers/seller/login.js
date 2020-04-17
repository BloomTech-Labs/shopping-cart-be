const Sellers = require('../../models/seller')
const bcrypt = require('bcryptjs')
const generateToken = require('../../helpers/generateToken')
const { validateLoginInput } = require('../../middleware/validateSellerData')

async function login (req, res) {
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { phone, password } = req.body

  try {
    const user = await Sellers.findOne({ phone })

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      return res.status(200).json({
        user: {
          id: user.id,
          phone: user.phone
        },
        token
      })
    } else {
      return res.status(401).json({ message: 'Invalid Credentials' })
    }
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = login
