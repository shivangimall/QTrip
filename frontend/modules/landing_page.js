import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const data = await fetch(config.backendEndpoint + '/cities');
    const user = await data.json();
    
    console.log(user);
    return user;
  }
  catch(err){
    return null;
  }
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityContainer = document.createElement("div");
  cityContainer.className = "col-12 col-sm-6 col-lg-3 mb-4";
  cityContainer.id = `${id}`;
  cityContainer.innerHTML = `

  <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="card tile flex-column justify-content-center align-items-center text-white text-center" >
    <img src="${image}" alt="...">
    <div class="tile-text ">
      <h2>${city}</h2>
      <p>${description}</p>
    </div>
    </div>
  </a>
    
  `;
  document.getElementById("data").appendChild(cityContainer);


}

export { init, fetchCities, addCityToDOM };
