const express = require('express')

// Create express instnace
const app = express()

// Require API routes

// Import API Routes
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
