const axios = require('axios')
const stopword = require('stopword')
const Tag = require('./schemas/tag')
const JSDOM = require('jsdom').JSDOM

const processQuery = async string => {
  const words = [...new Set(stopword.removeStopwords(
    string
    .replace(/\s+|[^\p{L}]/ugi, ' ')
    .split(' ')
    .filter(e => e.trim().length)
    .map(e => e.toLowerCase())
  ).filter(e => e.length > 2))]
  console.log(words)
  const promises = words.map(async word => {
    const response = await axios({
      method: 'get',
      baseURL: 'https://api.datamuse.com/words',
      params: {
        ml: word,
        max: 10
      }
    })
    return response.data
  })
  const final = (await Promise.all(promises)).map(array => array.map(object => object.word))
  return final.reduce((p, c) => p.concat(c), [])
}

const searchLinks = async links => {
  const tags = await Tag.find({ name: { $in: links } })
  return tags.map(e => e.urls).reduce((p, c) => p.concat(c), [])
}

const getTitleAndDesc = async url => {
  const { data } = await axios.get(url, {
    headers: {
      'Accept': 'Accept: text/html, application/xhtml+xml',
      'Accept-Language': 'en'
    }
  })
  const document = new JSDOM(data).window.document
  const title = document.querySelector('title')
  const description = document.querySelector('h1,h2,h3,h4,h5,h6')
  return {
    title: title ? title.textContent : '',
    description: description ? description.textContent : '',
    url
  }
}

const getTitleAndDescList = async list => {
  const promises = list.map(async url => {
    return await getTitleAndDesc(url)
  })
  return await Promise.all(promises)
}

module.exports = {
  processQuery,
  searchLinks,
  getTitleAndDesc,
  getTitleAndDescList
}
