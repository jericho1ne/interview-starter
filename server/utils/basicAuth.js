module.exports = {

  /**
   * Check basic Auth against present .env variables
   * @param {*} req Full HTTP Request
   * @param {*} res Response object, so we can short-circuit if auth fails
   * @param {*} credentials Valid credentials array
   * @returns 
   */
  verifyCredentials: function (req, res, credentials) {
    // Look for Basic Auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      res.json({ 
        statusCode: 401,
        success: false,
        msg: 'Missing Authorization Header'
      })
    } else {
      const base64Creds =  req.headers.authorization.split(' ')[1];
      const creds = Buffer.from(base64Creds, 'base64').toString('ascii');
      const [username, password] = creds.split(':');
      const user = credentials.find(u => u.username === username && u.password === password)

      // Valid credentials found
      if (user) {
        return true
      } else {
        res.json({ 
          statusCode: 401,
          success: false,
          msg: 'Unauthorized'
        })
      } // end else - Not authorized
    } // end else - Basic auth Header exists
    
  },

}