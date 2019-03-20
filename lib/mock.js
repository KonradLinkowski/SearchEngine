const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomLetter = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

const randomTitle = (min, max) => {
  const titleLength = randomInteger(min, max)
  const text = new Array(titleLength).fill(0).map(randomLetter).join('')
  return randomLetter().toUpperCase() + text
}

const randomDescription = (min, max) => {
  const descLength = randomInteger(min, max)
  const text = new Array(descLength).fill(0).map(() => Math.random() < 0.05 ? ' ' : randomLetter()).join('')
  return randomLetter().toUpperCase() + text +  '.'
}

const randomURL = (min, max) => {
  const urlLength = randomInteger(min, max)
  return new Array(urlLength).fill(0).map(() => Math.random() < 0.1 ? '.' : randomLetter()).join('')
}

const genArray = (amount) => {
  return new Array(amount).fill(0).map(() => {
    return {
      title: randomTitle(10, 20),
      url: randomURL(10, 30),
      description: randomDescription(50, 500)
    }
  })
}

module.exports = genArray
