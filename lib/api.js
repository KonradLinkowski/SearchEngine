const axios = require('axios')
const processQuery = async string => {
  const words = [... new Set(string
    .split(' ')
    .filter(e => e.trim().length)
  )]
  console.log(words)
  const promises = words.map(async word => {
    const response = await axios({
      method: 'get',
      baseURL: 'https://api.datamuse.com/words',
      params: {
        ml: word
      }
    })
    return response.data
  })
  return (await Promise.all(promises)).map(array => array.map(object => object.word))
}

module.exports = {
  processQuery
}
