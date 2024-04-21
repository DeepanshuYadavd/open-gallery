const auth="lMKGa96b08a76aEtuF8ayT7fv8xZlESWoWzzEn3kp9A1MGw8YZuAUtMA";
const gallery=document.querySelector(".gallery");
const searchInput=document.querySelector(".search-input");
const submitButton=document.querySelector(".search-btn");
const form=document.querySelector(".search-form");
const more=document.querySelector(".more")
let searchValue;
let page=1;
let fetchLink;


// event listner for search functionality:
searchInput.addEventListener("input",updateInput);
function updateInput(e){
    searchValue=e.target.value;
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        searchPhotos(searchValue);
    })

}
more.addEventListener("click",loadMore);

//  function for fetching the data  as object
async function fetchData(url){
    const dataFetch= await fetch(url,{
        method:'GET',
        headers:{
            Accept:'application/json',
            Authorization:auth
        }
    });
    const data= await dataFetch.json();
    return data;
}

// function for fetching the exact required data i.e. photos and photographer name
// and creating div for it.
function gettingPhotos(data){
 // fetch photos and photographer name:
 data.photos.forEach(photo=>{
    // create div
    const galleryImg=document.createElement("div");
    galleryImg.classList.add("gallery-content");
    galleryImg.innerHTML=`<img src='${photo.src.large}'></img>
    <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a href="${photo.src.original}">Download</a>
      </div>`;
    gallery.appendChild(galleryImg);
})
}

async function curatedPhotos(){
    // calling fetchData();
    fetchLink='https://api.pexels.com/v1/curated?per_page=20&page=1'
    const data= await fetchData(fetchLink);
   // fetch photos and photographer name:
    gettingPhotos(data);
}

async function searchPhotos(query){
    // calling clear()
    clear();
    // calling fetchData();
    fetchLink=`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
    const data= await fetchData(fetchLink);
    // fetch photos and photographer name:
    gettingPhotos(data);
}

// clear search function:
function clear(){
    gallery.innerHTML="";
    searchInput.value="";
}
async function loadMore(){
    page++;
    if(searchValue){
        fetchLink=`https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=${page}`;
  }else{
    fetchLink=`https://api.pexels.com/v1/curated?per_page=20&page=${page}`;
  }
const data=await fetchData(fetchLink);
gettingPhotos(data);

}
curatedPhotos();