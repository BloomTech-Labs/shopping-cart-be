const register = require('./register')
const login = require('./login')
const editStore = require('./editStore')
const createStore = require('./createStore')
const deleteStore = require('./deleteStore')
const { recover, resetPassword } = require('./passwordReset')
const getStore = require('./getStore')

module.exports = {
  register,
  login,
  editStore,
  createStore,
  deleteStore,
  recover,
  resetPassword,
  getStore
}
