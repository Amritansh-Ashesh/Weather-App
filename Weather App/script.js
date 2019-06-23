const unit =document.querySelector('.temp');
const degree =document.getElementById('unit');
const summary = document.querySelector('.forecast');
const zone = document.querySelector('.timezone');
const currentsummary = document.getElementById('current');
const temp = document.getElementById('degrees');
const BG = document.querySelector('.container');

window.addEventListener('load', () => {
    let long;
    let lat;

    //IF STATEMENT ISSUE
    // if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/1c9424849fc849dc22a73f5c96032111/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })

                .then(data => {
                    summary.textContent = data.daily.summary;
                    currentsummary.textContent = data.currently.summary;    
                    temp.textContent = data.currently.temperature + ' °F';
                    zone.textContent = data.timezone;
                    //Set Icons
                    const ICON = data.currently.icon;
                    setIcons(ICON, document.querySelector(".icon"));
                    // console.log(data); 


                    degrees.addEventListener('click',() =>{
                        if(temp.textContent === data.currently.temperature + ' °F'){
                            let t = (data.currently.temperature -32) *5/9;
                            temp.textContent = t.toFixed(1) + ' °C';
                        }
                        else
                        temp.textContent = data.currently.temperature + ' °F';
                    } )
                })
            function setIcons(ICON,iconID){
                const skycons = new Skycons( { color: "white"});
                const currentIcon = ICON.replace(/-/g, "_").toUpperCase();
                skycons.play();
                return skycons.set(iconID, Skycons[currentIcon]);
            }
        });
    // }
});

let date = new Date();
let time = date.getHours();

if (6 <=time && time <20){
    document.body.background = "Images/day1.jpg"
}

else {
    document.body.background = "Images/day2.jpg";
}
