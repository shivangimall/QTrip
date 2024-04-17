
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  
    let params = new URLSearchParams(search);
    let city = params.get('city');
    
    return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  console.log(city);
  try{
    const data = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const user = await data.json();
    
    console.log(user);
    return user;
  }
  catch(err){
  
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let adventuresCard = "";
  adventures.forEach(key => {
   
    const dive = document.createElement('div');
    dive.className = 'col-12 col-sm-6 col-lg-3 mb-4 position-relative';
    // dive.id = key.id;

const a = document.createElement('a');
a.setAttribute("id",`${key.id}`);
a.href = `detail/?adventure=${key.id}`;

const innerDiv = document.createElement('div');
innerDiv.className = 'activity-card';

const img = document.createElement('img');
img.src = key.image;
img.className = 'card-img-top';
img.alt = key.name;



const cardBody = document.createElement('div');
cardBody.className = 'col container d-flex justify-content-between';

const firstInnerDiv = document.createElement('div');
firstInnerDiv.className = 'd-flex-column justify-content-between';

const firstP = document.createElement('p');
firstP.innerText = key.name;

const secondP = document.createElement('p');
secondP.innerText = 'Duration';

firstInnerDiv.appendChild(firstP, secondP);

const secondInnerDiv = document.createElement('div');
secondInnerDiv.className = 'd-flex-col justify-content-between';

const thirdP = document.createElement('p');
thirdP.innerText = `₹ ${key.costPerHead}`;

const fourthP = document.createElement('p');
fourthP.innerText = `${key.duration} Hours`;

const h6 = document.createElement('h6');
h6.className = 'category-banner';
h6.innerText = key.category;

firstInnerDiv.appendChild(firstP);
firstInnerDiv.appendChild(secondP);

secondInnerDiv.appendChild(thirdP);
secondInnerDiv.appendChild(fourthP);

cardBody.appendChild(firstInnerDiv);
cardBody.appendChild(secondInnerDiv);

innerDiv.append(img, cardBody);

a.appendChild(innerDiv);

dive.appendChild(a);
dive.appendChild(h6);
document.getElementById("data").appendChild(dive);

  });

  

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(list);
  return list.filter(adven => adven.duration>=low && adven.duration<=high);

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(adventure => categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  let filteredList = list;

  if (filters.duration !=="" && filters.category.length > 0) {
    console.log(filters.category);
    filteredList = filterByCategory(filteredList, filters.category);
    filteredList = filterByDuration(filteredList, filters.duration.split("-")[0], filters.duration.split("-")[1]);
    return filteredList;
    
  } else if (filters.duration !== "") {
    console.log(filters.duration);
    filteredList = filterByDuration(filteredList, filters.duration.split("-")[0], filters.duration.split("-")[1]);
    return filteredList;
  } 
  else if (filters.category.length > 0) {
    filteredList = filterByCategory(filteredList, filters.category);
    return filteredList;
  }
  else
  {
    return filteredList;
  }

  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  console.log(filters);
  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = localStorage.getItem("filters");
  if (filters) {
    filters = JSON.parse(filters);
   
    return filters;
  }
  // return {};


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
  const fil = filters.category;
  const listt = [];

  console.log(fil);
  for(let i=0;i<fil.length;i++)
  {
    listt.push(fil[i]);
  }
  console.log(listt);
  for(let i=0;i<listt.length;i++)
  {
    const pill = document.createElement("div");
    pill.setAttribute("class","category-filter");
    pill.innerText = listt[i];
    document.getElementById("category-list").append(pill);
  }


}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
