if (process.env.NODE_ENV === 'production')
  module.exports = require('./libraryRouter.production.js')
else
  module.exports = require('./libraryRouter.development.js')
