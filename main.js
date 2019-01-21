const endpoint = './worldpopulation.json'
const countries = []

fetch(endpoint)
  .then(res => res.json())
  .then(data => countries.push(...data))