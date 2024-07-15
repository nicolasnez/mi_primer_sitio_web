$('#buscar').on('click', function() {
    let ciudad_buscada = $('#ciudad').val().trim();


    if (ciudad_buscada.length > 0){
        console.log(ciudad_buscada);

        let units = 'metric';
        let lang = 'es';
        let apiid = 'ddd9f619df3883e5b99ca46c03f2ccea';
        let urlOpenWeatherMap = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad_buscada}&lang=${lang}&units=${units}&appid=${apiid}`;

        $.getJSON(urlOpenWeatherMap, function(dataClima) {
            console.log(dataClima);
            let paisCode = dataClima.sys.country;
            let urlRestCountries = `https://restcountries.com/v3.1/alpha/${paisCode}`;

            $.getJSON(urlRestCountries, function(dataPais) {

                let html = 
                    `
                    <h5 class="card-title">${dataClima.name} (${dataPais[0].translations.spa.common}): ${dataClima.weather[0].description}</h5>
                    <h5 class="card-title">Temperatura: ${dataClima.main.temp}°C</h5>
                    <h5 class="card-title">Sensación Térmica: ${dataClima.main.feels_like}°C</h5>
                    <h5 class="card-title">Humedad: ${dataClima.main.humidity}%</h5>
                    <h5 class="card-title">Velocidad Viento: ${(Math.round(dataClima.wind.speed * 10.0) / 10.0 * 3.6).toFixed(1)} km/hr</h5>
                    <h5 class="card-title">Coordenadas: ${dataClima.coord.lat}, ${dataClima.coord.lon}</h5>
                    `;

                    $('#info-clima').html(html);

                let img = 
                    `
                    <img src="https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@4x.png" alt="Imagen clima">
                    `;

                    $('#img-clima').html(img);

            });
            
        }).fail(function() {
            Swal.fire({
                title: "oops...",
                text: "La ciudad buscada no se encuentra en el mundo mundial.",
                icon: "error",
                confirmButtonText: "Okidoki"
              });
        });
    }
    else {
        Swal.fire({
            title: "oops...",
            text: "Debes ingresar una ciudad para buscar",
            icon: "question",
            confirmButtonText: "Okidoki"
          });
    }

});