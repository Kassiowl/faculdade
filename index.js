const fs = require("fs");
const json2csv = require('json2csv').parse;
var csv = require('csv-parser');


const geocoder = NodeGeocoder(options);

function getDistanceFromLatLonInKm(position1, position2) {          //calcular distancia de 2 posicoes
    "use strict";
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(position2.lat - position1.lat),
        dLng = deg2rad(position2.lon - position1.lon),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(position1.lat))
            * Math.cos(deg2rad(position1.lat))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return ((R * c *1000).toFixed());
}




var dataArray = [];
let salvador = 
{
    lat: -12.9704,
    lon: -38.5124
}
let feira_santana = 
{
    lat:-12.2733, 
    lon:-38.9556
}

let vitoria_conquista = 
{
    lat: -14.8648,
    lon: -40.8369
}

let camaçari = 
{
    lat: -12.6964,
    lon: -38.3234
}

fs.createReadStream('empresas_bahia_lista_3.csv')
  .pipe(csv())
  .on('data', function (data) 
  {

      var address = data.cep

      const letdataLatLngObj = geocoder.geocode(data.cep);


    data.dist_1 = getDistanceFromLatLonInKm(salvador,letdataLatLngObj)    //arrumar um jeito de pegar a latitude e longetude de cada empresa
    data.dist_2 = getDistanceFromLatLonInKm(feira_santana,letdataLatLngObj)
    data.dist_3 = getDistanceFromLatLonInKm(vitoria_conquista,letdataLatLngObj)
    data.dist_4 = getDistanceFromLatLonInKm(camaçari,letdataLatLngObj)
 
  })
  .on("end", function()
  {
    console.log(dataArray[0])
    var result = json2csv(dataArray);
    console.log(result[0])
    fs.writeFileSync('empresas_bahia_lista_3v2.csv', result);
  })
  .on("error", function(error)
  {
    console.log(error)
  })