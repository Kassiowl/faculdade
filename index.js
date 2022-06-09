const fs = require("fs");
const json2csv = require('json2csv').parse;
var csv = require('csv-parser');

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

var ConverterEstados = function(val) {
	var data;

	switch (val.toUpperCase()) {

		
		/* Estados */
		case "ACRE" :					data = "AC";	break;
		case "ALAGOAS" :				data = "AL";	break;
		case "AMAZONAS" :				data = "AM";	break;
		case "AMAPÁ" :					data = "AP";	break;
		case "BAHIA" :					data = "BA";	break;
		case "CEARÁ" :					data = "CE";	break;
		case "DISTRITO FEDERAL" :		data = "DF";	break;
		case "ESPÍRITO SANTO" :			data = "ES";	break;
		case "GOIÁS" :					data = "GO";	break;
		case "MARANHÃO" :				data = "MA";	break;
		case "MINAS GERAIS" :			data = "MG";	break;
		case "MATO GROSSO DO SUL" :		data = "MS";	break;
		case "MATO GROSSO" :			data = "MT";	break;
		case "PARÁ" :					data = "PA";	break;
		case "PARAÍBA" :				data = "PB";	break;
		case "PERNAMBUCO" :				data = "PE";	break;
		case "PIAUÍ" :					data = "PI";	break;
		case "PARANÁ" :					data = "PR";	break;
		case "RIO DE JANEIRO" :			data = "RJ";	break;
		case "RIO GRANDE DO NORTE" :	data = "RN";	break;
		case "RONDÔNIA" : 				data = "RO";	break;
		case "RORAIMA" :				data = "RR";	break;
		case "RIO GRANDE DO SUL" :		data = "RS";	break;
		case "SANTA CATARINA" :			data = "SC";	break;
		case "SERGIPE" :				data = "SE";	break;
		case "SÃO PAULO" :				data = "SP";	break;
		case "TOCANTÍNS" :				data = "TO";	break;
	}
    return data
}
//creditos https://gist.github.com/renancouto/3784690



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

    data.dist_1 = ''  
    data.dist_2 = ''
    data.dist_3 = ''
    data.dist_4 = ''
    dataArray.push(data)
 
  })
  .on("end", function()
  {
    console.log(dataArray[0])
    var result = json2csv(dataArray);
    console.log(result[0])
    fs.writeFileSync('empresas_bahia_lista_3.csv', result);
    dataArray = []
  })
  .on("error", function(error)
  {
    console.log(error)
  })

fs.createReadStream('empresas_bahia_lista_3.csv')
  .pipe(csv())
  .on('data', function (data) 
  {

    data.dist_1 = ''  
    data.dist_2 = ''
    data.dist_3 = ''
    data.dist_4 = ''
    dataArray.push(data)
 
  })
  .on("end", function()
  {
    console.log(dataArray[0])
    var result = json2csv(dataArray);
    console.log(result[0])
  })
  .on("error", function(error)
  {
    console.log(error)
  })

fs.createReadStream('cidade_siafi.csv')
  .pipe(csv())
  .on('data', function (data) 
  {
    delete data.codigo_uf;
    delete data.siafi_id
    delete data.nome;
    delete data.codigo_ibge;
    data.latitude_cidade = data.latitude
    data.longitude_cidade = data.longitude
    data.nome_fantasia = null
    data.slug = null
    data.inicio_atividades = null
    data.porte_empresa = null
    data.nome_cidade = null
    data.sigla_uf= null
    data.populacao_cidade = null
    data.dist_1 = null  //arrumar um jeito de pegar a latitude e longetude de cada empresa
    data.dist_2 = null
    data.dist_3 = null
    data.dist_4 = null
    delete data.latitude
    delete data.longitude
    dataArray.push(data)
  })
  .on("end", function()
  {
    console.log(dataArray[0])
    var result = json2csv(dataArray);
    console.log(result[0])
  })
  .on("error", function(error)
  {
    console.log(error)
  })

fs.createReadStream('cidade_populacao.csv')
  .pipe(csv())
  .on('data', function (data) 
  {
    data.populacao_cidade = data.populacao;
    data.sigla_uf = ConverterEstados(data.nome_uf);
    data.nome_fantasia = null
    data.slug = null
    data.inicio_atividades  = null
    data.porte_empresa = null
    data.nome_cidade = null
    data.latitude_cidade = null
    data.longitude_cidade= null
    data.dist_1 = null //arrumar um jeito de pegar a latitude e longetude de cada empresa
    data.dist_2 = null
    data.dist_3 = null
    data.dist_4 = null
    delete data.nome_uf;
    delete data.populacao;
    delete data.cod_ibge;
    delete (data['﻿cod_ibge']);
    dataArray.push(data)
  })
  .on("end", function()
  {
    console.log(dataArray[0])
    var result = json2csv(dataArray);
    console.log(result[0])
    fs.writeFileSync('saida.csv', result);
  })
  .on("error", function(error)
  {
    console.log(error)
  })