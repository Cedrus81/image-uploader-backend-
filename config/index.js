var config

if (process.env.NODE_ENV === 'production') {
  config = require('./prod')
} else {
  console.log(process.env.NODE_ENV)
  config = require('./dev')
}
config.isGuestMode = true

module.exports = config
