'use strict'
const $input = document.querySelector('#query-input')
const $button = document.querySelector('#query-button')
$button.addEventListener('click', () => {
  search()
})
$input.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    search()
  }
})

function search() {
  window.location.href='/search?string=' + $input.value
}
