'use strict';

module.exports = class errorLog {
  constructor() {
  }

  /**
   * Prints and error message to the Netlify functions log
   * @param {string} errorMessage 
   * @param {object} request Optional
   */
  print(url, params, errorMessage) {
    console.log('---------------------------------------')
    console.log(` > ERROR 💔 ${errorMessage}`)
    console.log(` > ${url}`)
    if (params) { 
      console.log(` > params: ${JSON.stringify(params)}`)
    }
    console.log('---------------------------------------')
  }
}
