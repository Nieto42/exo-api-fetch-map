const search = document.querySelector('.search')
const results = document.querySelector('.results')

let searchTerm = '';
let countries;

// API REQUEST
const fetchCountries = async() => {
    countries = await fetch (
        'https://restcountries.eu/rest/v2/all?fields=name;population;flag'
    )
    .then(res => res.json());
    console.log(countries);
};


const showCountries = async() => {
	await fetchCountries();
  
  results.innerHTML = (
  
    countries
    .filter(country => country.name.toLowerCase()
    .includes(searchTerm.toLowerCase()))
    .map(country => ( 

        ` 
          <li class="country-item">
            <img class="country-flag" src="${country.flag}" />
            <h3 class="country-name">${country.name}</h3>
            <div class="country-info">
              <h2 class="country-population">${numberWithSpace(country.population)}</h2>
              <h5 class="country-population-text">Habitants</h5>
            </div>
          </li>
        `
      )).join('')
  );
}; 

showCountries();

//INPUT SETUP
search.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    showCountries()
})
function numberWithSpace(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}