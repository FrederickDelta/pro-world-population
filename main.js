const endpoint = './worldpopulation.json'
const countries = []

fetch(endpoint)
  .then(res => res.json())
  .then(data => countries.push(...data))

function search(keyword, countries){
  return countries.filter(country => {
    const regex = new RegExp(keyword, 'gi')
    return country.country.match(regex)
  })
}