const register = require('./register')
const login = require('./login')
const editStore = require('./editStore')
const createStore = require('./createStore')
const deleteStore = require('./deleteStore')
const { recover, reset, resetPassword } = require('./passwordReset')
module.exports = {
  register,
  login,
  editStore,
  createStore,
  deleteStore,
  recover,
  reset,
  resetPassword
}
