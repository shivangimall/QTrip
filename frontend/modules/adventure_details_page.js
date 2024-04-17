import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  // console.log(search);
  const url = new URLSearchParams(search);

  // console.log(url.get("adventure"));
  return (url.get("adventure"));


  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const data = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const detail = await data.json();

    // console.log(detail);
    return detail;
  }
  catch(err)
  {
    // alert(err);
    return null;
  }


  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
  const head = document.getElementById("adventure-name");
  head.append(adventure.name);
  const subHead = document.getElementById("adventure-subtitle");
  subHead.append(`${adventure.subtitle}`);
  const photo = document.getElementById("photo-gallery");

  for(let i =0;i<adventure.images.length;i++)
  {
    const dive = document.createElement('div');
    const image1 = document.createElement('img')
    image1.setAttribute("class","activity-card-image");
    image1.src = adventure.images[i];
 
    dive.appendChild(image1);
    photo.appendChild(dive);
  }
  
  document.getElementById("adventure-content").append(`${adventure.content}`);
  // content.innerText = `${adventure.content}`;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // console.log(images);
  const photo = document.getElementById("photo-gallery");

  const photos =  
  `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  ${images.map((image, index) => `
  <div class="carousel-item ${index === 0 ? 'active' : ''}">
    <img src="${image}" class="d-block w-100 activity-card-image" alt="Image ${index + 1}">
  </div>
`)}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
  photo.innerHTML = photos;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  if(adventure.available)
  {
    const advan1 = document.getElementById("reservation-panel-available");
    advan1.style.display = "block";
    const advan = document.getElementById("reservation-panel-sold-out");
    advan.style.display = "none";
    
    const cost = document.getElementById("reservation-person-cost");
    cost.innerHTML = adventure.costPerHead;
    
  }
  else
  {
    const advan = document.getElementById("reservation-panel-sold-out");
    advan.style.display = "block";
    const advan1 = document.getElementById("reservation-panel-available");
    advan1.style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  
  // const  cost = document.getElementById("reservation-person-cost").innerText;
  
  const total = document.getElementById("reservation-cost")
  total.innerHTML = ((adventure.costPerHead)*persons);

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // console.log(adventure);
  const page = document.getElementById("myForm");
  console.log(page.elements["date"].value)
  
  // console.log(data)

  page.addEventListener("submit",async (event)=>
  {
  
    event.preventDefault();
	const detail = {
    adventure : adventure.id,
    name : page.elements["name"].value,
    date : page.elements["date"].value,
    person: page.elements["person"].value
  }
     try{
     let res = await fetch(`${config.backendEndpoint}/reservations/new`, 
     {
      method:"POST",
      body:JSON.stringify(detail),
      headers: {'Content-Type': 'application/json'}
    }
     );
     console.log(res)

      if(res.ok){
        alert("Success!");
        window.location.reload();
      }
    }
    catch(err){
      console.log(err);
      alert("Failed!")
    }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  // console.log(adventure);
  if(adventure.reserved)
  {
    document.getElementById("reserved-banner").style.display = "block"; 
    // adventure.available = false;
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
