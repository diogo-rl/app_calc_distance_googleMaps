

function implementGmaps() {
    var map;
    var latlng1;
    var latlng2;

    GMaps.geocode({
        address: $('#endereco_inicial').val(),
        callback: function (results, status) {
            if (status == 'OK') {
                latlng1 = results[0].geometry.location;
                GMaps.geocode({
                    address: $('#endereco_final').val(),
                    callback: function (results, status) {
                        if (status == 'OK') {
                            latlng2 = results[0].geometry.location;
                            map = new GMaps({
                                div: '#map',
                                lat: latlng1.lat(),
                                lng: latlng1.lng(),
                                zoom: 12
                            });
                            map.drawRoute({
                                origin: [latlng1.lat(), latlng1.lng()],
                                destination: [latlng2.lat(), latlng2.lng()],
                                travelMode: 'driving',
                                strokeColor: '#3C8DBC',
                                strokeOpacity: 0.6,
                                strokeWeight: 6
                            });
                            map.getRoutes({
                                origin: [latlng1.lat(), latlng1.lng()],
                                destination: [latlng2.lat(), latlng2.lng()],
                                callback: function (e) {
                                    var time = 0;
                                    var descricaoTempo = "";
                                    var distance = 0;

                                    for (var i = 0; i < e[0].legs.length; i++) {
                                        time += e[0].legs[i].duration.value;
                                        distance += e[0].legs[i].distance.value;
                                    }

                                    time = (time / 60);

                                    if (time > 60) {
                                        time = time / 60;
                                        $("#labelTime").html("Tempo de corrida em horas estimado:");
                                    } else {
                                        $("#labelTime").html("Tempo de corrida em minutos estimado:");
                                    }

                                    time = time.toFixed(2)

                                    distance = distance / 1000;
                                    $('#time').text(time);
                                    $('#distance').text(distance);

                                    localStorage.setItem("distance", distance);
                                    localStorage.setItem("time", time);

                                }
                            });
                        }
                    }
                });
            }
        }
    });
}


function showCalculaDistancia() {
    BootstrapDialog.show({
        size: BootstrapDialog.SIZE_NORMAL,
        title: "Calcula Distância",
        buttons: [{
            label: 'Cancelar',
            cssClass: 'btn-success',
            action: function (dialog) {

                dialog.close();
            }
        }],
        message: '<script class="scriptPesquisa" type="text/javascript" src="js/googleMaps.js"></script>' +
                  '<div>' +
                 ' <input class ="texto form-control" id="endereco_inicial" type="text" style="text-align: left;" />' +
                 ' <input class ="texto form-control" id="endereco_final" type="text" style="text-align: left;" />' +
                 '<input id="btnCalculaDist" type="button" class="btn btn-success pesquisarTaxista" value="Pesquisar" />' +
                 '<label id="labelTime">Tempo de corrida em minutos estimado:</label>' +
                 '<p id="time"></p>'+
                 '<label id="labelDistance">Distância da corrida em Km estimado:</label>' +
                 '<p id="distance"></p>' +
                 '<div id="map" style="width:300px !important;height:300px !important; display:none">' +
                 '</div>' +
                 '</div>'

        });

}



$(document).ready(function () {                       
                                                      
    $("#btnCalculaDist").on("click", function () {    
                                                      
        $("#map").show();
        implementGmaps();                             
    })                                                
                                                      
});                                                   


function calc() {
    localStorage.getItem("distace");

    localStorage.removeItem("distance");

}