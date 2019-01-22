const endpoint = './worldpopulation.json'
const countries = []

fetch(endpoint)
  .then(res => res.json())
  .then(data => countries.push(...data))

const searchInput = document.querySelector(".search")
const resultList = document.querySelector(".results")

searchInput.addEventListener('change', displayResults)
searchInput.addEventListener('keyup', displayResults)

function displayResults(){
  const searchResults = search(this.value, countries)
  const html = searchResults.map(country => {
    const rank = `No.${country.Rank}`
    const regex = new RegExp(this.value, 'gi')
    const countryName = country.country.replace(regex, `<span class="hl">${this.value.toString().toLowerCase()}</span>`)
    const population = addCommaSeparator(country.population)
    //Trick: the space before `${countryName}` is to make sure `text-transform: capitalize` work as expected
    return `
      <li>
        <span class="rank">${rank}</span>
        <span class="country"> ${countryName}</span>
        <span class="population">${population}</span>
      </li>
    `
  }).join('')
  resultList.innerHTML = html
}

function search(keyword, countries){
  return countries.filter(country => {
    const regex = new RegExp(keyword, 'gi')
    return country.country.match(regex)
  })
}

function addCommaSeparator(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}