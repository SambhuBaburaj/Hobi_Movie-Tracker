//Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
const playlistDataElement = document.getElementById('playlist-data');
const playlistData = JSON.parse(playlistDataElement.textContent);
let movieName = movieNameRef.value;
let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

function addingplaylist(movie,urldata)
{
  let movieName = movieNameRef.value;
  movieurl=`http://www.omdbapi.com/?t=${movieName}&apikey=${key}`
  console.log(movie,urldata);
  console.log('clicked');
    event.preventDefault()
        $.ajax({
          type: "POST",
          url: "/addingtoplaylist",
          data: {
            urldata:movieurl,
          userid:movie,
          
          },
          dataType: "json",
          success: (response) => {
    
       console.log(response);
if(response)
{
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'playlist has been added',
    showConfirmButton: false,
    timer: 1500
  })
}
else{
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: 'movie already exist',
    showConfirmButton: false,
    timer: 1500
  })
}

     
            // setTimeout(location.reload(), 5000);
          },
        });
      
  
  
  
  
  }
  





 
// Now you can use the playlistData array in your client-side JavaScript code

const divContent = playlistData.map(element => {

  if(element.public==1)
  {console.log(element._id);
    return `<a onclick="addingplaylist('${element._id}','${url}')">${element.Name}</a>`;
  
  }
  
}).join('');

const divprivateContent =playlistData.map(element => {

  if(element.public==0)
  {

  return `<a onclick="addingplaylist('${element._id}','${url}')">${element.Name}</a>`;
  
  }  

}).join('');


//Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  console.log('url');
  console.log(url);
  //If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  }
  //If input field is NOT empty
  else {



    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        console.log('this the moviee data');
        //If movie exists in database
        if (data.Response == "True") {
          result.innerHTML = `
          
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="star-icon.svg">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    
                        </div>
                        <div class="dropdown">
                        <button class="dropbtn" onclick="toggleDropdown('dropdown-content-1')">Add to playlist</button>
                        <div class="dropdown-content dropdown-content-1">
                          <div class="sub-dropdown">
                            <button class="sub-dropbtn" onclick="toggleDropdown('sub-dropdown-content-1')">Public List</button>
                            <div class="sub-dropdown-content sub-dropdown-content-1">
                           
                  
<div id='playlistdata'></div>
                            <a onclick="openPopup(1)">Create public list</a>
                       
                        ${divContent}
                            </div>
                          </div>
                          <div class="sub-dropdown">
                            <button class="sub-dropbtn" onclick="toggleDropdown('sub-dropdown-content-2')"> Private list</button>
                            <div class="sub-dropdown-content sub-dropdown-content-2">
                              <a onclick="openPopup(0)">create private list</a>
                              ${divprivateContent}
                            </div>
                          </div>
                        </div>
                      </div>
                      


                    
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            
        `;



        
        }


        //If movie does NOT exists in database
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      //If error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);