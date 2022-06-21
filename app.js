window.addEventListener('load', ()=> {
    let long;
    let lat;
    let tempdesc = document.querySelector('.temperature-description');
    let tempdegree = document.querySelector('.temperature-degree');
    let locationtimezone = document.querySelector('.location-timezone');
    let tempsection = document.querySelector('.degree-section');
    const tempspan = document.querySelector('.degree-section span');
    let uvs = document.querySelector('.UV-index');
    let humiditys = document.querySelector('.humidity');
    let feelslike = document.querySelector('.feels-like-temp');


    console.log("buns");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const api = `http://api.weatherapi.com/v1/current.json?key=65e501c41cf2484887f214152221506&q=${lat},${long}&aqi=no`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temp_c, temp_f, condition, uv, feelslike_c, feelslike_f, humidity} = data.current;
                const {tz_id, name} = data.location;
                const image = document.createElement('img');
                console.log(data);
                console.log(humidity);

                // set DOM elements from api
                tempdegree.textContent = temp_c;
                tempdesc.textContent = condition.text;
                locationtimezone.textContent = name;
                document.getElementById("my-image").src = condition.icon;
                uvs.textContent = `UV Index: ${uv}`;
                humiditys.textContent = `HUMIDITY: ${humidity}%`;
                feelslike.textContent = `feels like: ${feelslike_c}°C`;
                

                //change temp to deg or f
                tempsection.addEventListener('click', ()=> {
                    if(tempspan.textContent === "°F"){
                        tempspan.textContent = "°C";
                        tempdegree.textContent = temp_c;
                        feelslike.textContent = `feels like: ${feelslike_c}°C`;
                    }else{
                        tempspan.textContent = "°F";
                        tempdegree.textContent = temp_f;
                        feelslike.textContent = `feels like: ${feelslike_f}°F`;
                    }
                });



            })
        });
    }
});