/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '4b6b3c1ae82a7c46810a3766b66608c7&units=imperial';
const zip = document.getElementById('zip');
const feel = document.getElementById('feelings');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to GET Web API Data*/
const getData = async (link) => {
     const res = await fetch(link)
try {
const data = await res.json();
console.log(data);
return(data);
}  catch(error) {
// appropriately handle the error
console.log("error", error);
  }
};
/* Function to POST data */
const posting = async (url='' , postData={}) => {
  const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json',},
       // Body data type must match "Content-Type" header
        body: JSON.stringify(postData),
      });

try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};
/* Function to GET Project Data */
const retrieveData = async () =>{
  const request = await fetch('/all');
 try {
 // Transform into JSON
 const allData = await request.json()
 console.log(allData)
 // Write updated data to DOM elements
 document.getElementById('temp').textContent = Math.round(allData.temp)+ 'degrees';
 document.getElementById('content').textContent = allData.content;
 document.getElementById("date").textContent =allData.date;
 }
 catch(error) {
   console.log("error", error);
   // appropriately handle the error
 }
};
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', Action);
/* Function called by event listener */
function Action(e){
const url =`https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=${apiKey}`;
    if(!zip.value){
      alert("zip code missing !");
    }else{
      getData(url)
       .then(
         (data) =>{
   return posting('/postall', {temp:data.main.temp, date:newDate, feeling:feel.value})
 })
 .then(
   ()=> retrieveData()
 )
 }
};
