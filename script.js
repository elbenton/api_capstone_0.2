'use strict'

//OMDb
const apiKey = '2833b799';
const searchURL = 'http://www.omdbapi.com/';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#movie-results').empty();
  // iterate through the items array
  let maxList = responseJson.data.length;
  if(maxList > maxResults) maxList = maxResults;
  //console.log(maxList);
   for (let i = 0; i < maxList; i++){
    $('#movie-results-list').append()
      `<div id="movie-name">
        <h3 class="moviesJs">${movie.title}</h3>
      </div>
      <div id= "movie-description">
        <a href=" ${movie.poster}"></a>
       </div>`
  }
  //display the results section
  $('#results').removeClass('hidden');
};


  function getMovies(query, maxResults=10) {
  const params = {
    t: query,
    apikey: apiKey,
    };
  
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    console.log('Button clicked');
    const searchTerm = $('#movie-search').val();
    const maxResults = 10; 
    getMovies(searchTerm, maxResults); 
  });
}

$(watchForm);
