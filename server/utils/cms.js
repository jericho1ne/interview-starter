'use strict'

const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const showDrafts = process.env.SHOW_DRAFT_CONTENT

const host = (showDrafts == 'true')
  ? "preview.contentful.com" 
  : "cdn.contentful.com"

const accessToken = (showDrafts == 'true')
  ? process.env.CONTENTFUL_PREVIEW_TOKEN
  : process.env.CONTENTFUL_DELIVERY_TOKEN

const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: accessToken,
  host: host,
})

module.exports = {

  /**
   * Grab all entries of a specific type
   * @param {*} contentType 
   * @param {*} fields (optional)
   * @returns 
   */
  fetchEntries: async function(contentType, limit = 100, fields = '') {  
    const entries = await client.getEntries({
      content_type: contentType,
      // order: 'fields.title',
      select: fields ? fields.join(',') : '',
      include: 2,
      limit,
    })
    
    if (!entries?.items && entries?.items?.length == 0) {
      console.log(`Error getting Entries for ${contentType}.`)
      return []
    } else {
      return entries.items
    }
  },

  /**
   * Grab a specific entry by field value
   * @param {*} where 
   * @param {*} selectFields (optional)
   * @returns 
   */
  fetchSingleEntry: async function(contentType, query, uniqueId, selectFields = '') {  
    const entries = await client.getEntries({
      content_type: contentType,
      [query]: uniqueId,
      select: selectFields ? selectFields.join(',') : '',
      include: 2,
      limit: 1,
    })

    if (!entries?.items && entries?.items?.length == 0) {
      return []
    } else {
      return entries.items
    }
  },

  /**
   * Flattens a Contentful assets array, keeping only relevant key/value pairs
   * @returns {array}
   */
  flattenContentfulAssets: function (assets) {
    return assets.map((item) => {
      return { 
        id: item.sys.id,
        title: item.fields.title,
        url: item.fields.file.url
      }
    })
  },
  
}
